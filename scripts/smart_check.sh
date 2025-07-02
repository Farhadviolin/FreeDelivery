#!/usr/bin/env bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

function print_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✔ $2${NC}"
  else
    echo -e "${RED}✖ $2${NC}"
  fi
}

echo -e "${YELLOW}Starte smarte Projektprüfung...${NC}"

for dir in $(find . -type d); do
  echo -e "\n${YELLOW}Prüfe $dir ...${NC}"
  # Node.js Projekte
  if [[ -f "$dir/package.json" ]]; then
    (cd "$dir" && npm install --ignore-scripts --no-audit --no-fund > /dev/null 2>&1)
    npm run lint --prefix "$dir" > /dev/null 2>&1
    print_result $? "Lint (Node.js)"
    npm audit --audit-level=high --prefix "$dir" > /dev/null 2>&1
    print_result $? "Security Audit (npm)"
  fi
  # Python Projekte
  if [[ -f "$dir/requirements.txt" ]]; then
    pip install -r "$dir/requirements.txt" > /dev/null 2>&1
    pylint $(find "$dir" -name '*.py') > /dev/null 2>&1
    print_result $? "Lint (Python)"
    pip-audit -r "$dir/requirements.txt" > /dev/null 2>&1
    print_result $? "Security Audit (pip)"
  fi
  # Terraform
  if compgen -G "$dir/*.tf" > /dev/null; then
    terraform -chdir="$dir" init -backend=false > /dev/null 2>&1
    terraform -chdir="$dir" validate > /dev/null 2>&1
    print_result $? "Terraform Validate"
    tfsec "$dir" > /dev/null 2>&1
    print_result $? "tfsec Security Scan"
  fi
  # Kubernetes YAML
  if compgen -G "$dir/*.yaml" > /dev/null; then
    for yml in "$dir"/*.yaml; do
      kubectl apply --dry-run=client -f "$yml" > /dev/null 2>&1
      print_result $? "K8s Syntax Check: $yml"
    done
  fi
  # Markdown Docs
  if compgen -G "$dir/*.md" > /dev/null; then
    mdl "$dir"/*.md > /dev/null 2>&1
    print_result $? "Markdown Lint"
  fi
  # Test-Ordner
  if [[ "$dir" == *test* || "$dir" == *tests* ]]; then
    if compgen -G "$dir/*.py" > /dev/null; then
      pytest "$dir" > /dev/null 2>&1
      print_result $? "Pytest ($dir)"
    fi
    if compgen -G "$dir/*.ts" > /dev/null; then
      jest "$dir" > /dev/null 2>&1
      print_result $? "Jest ($dir)"
    fi
  fi
  # Skripte
  if compgen -G "$dir/*.sh" > /dev/null; then
    for shf in "$dir"/*.sh; do
      bash -n "$shf"
      print_result $? "Shell Syntax: $shf"
    done
  fi
  if compgen -G "$dir/*.py" > /dev/null; then
    for pyf in "$dir"/*.py; do
      python -m py_compile "$pyf" > /dev/null 2>&1
      print_result $? "Python Syntax: $pyf"
    done
  fi
  if compgen -G "$dir/*.js" > /dev/null; then
    for jsf in "$dir"/*.js; do
      node --check "$jsf" > /dev/null 2>&1
      print_result $? "Node Syntax: $jsf"
    done
  fi
  # TODO/FIXME Suche
  grep -rIn --include='*.js' --include='*.ts' --include='*.py' --include='*.sh' --include='*.md' 'TODO\|FIXME' "$dir" || true

done

echo -e "\n${GREEN}Smarte Projektprüfung abgeschlossen!${NC}" 