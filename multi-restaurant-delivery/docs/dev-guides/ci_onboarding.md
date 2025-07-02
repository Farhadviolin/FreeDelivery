# Onboarding eines neuen Services in CI/CD

1. Erstelle Service-Ordner (z.B. `order-service/`) mit `Dockerfile` und `k8s/`
2. Lege `.github/workflows/<service>.yml` an, das das `ci-template.yml` nutzt
3. Definiere `servicePath` und `serviceName` im Workflow
4. Füge notwendige Secrets in GitHub ein (z.B. `REGISTRY_TOKEN`, `KUBE_CONFIG`)
5. Prüfe `Actions` → Workflow läuft bei Push auf `main` in diesem Pfad

## Beispiel für neuen Service-Workflow
```yaml
name: CI/CD Order Service
on:
  push:
    paths:
      - 'order-service/**'
    branches: [ main ]
jobs:
  ci:
    uses: ./.github/workflows/ci-template.yml
    with:
      servicePath: 'order-service'
      serviceName: 'order-service'
```

## Template-Validierung
- Nutze [act](https://github.com/nektos/act) für lokale Tests
- Prüfe Matrix-Builds und Secret-Scopes
