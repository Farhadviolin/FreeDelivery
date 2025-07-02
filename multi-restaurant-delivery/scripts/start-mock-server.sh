#!/usr/bin/env bash
# Mock-Server für OpenAPI-Spec (Prism)
# Startet einen lokalen Mock-Server auf Port 4000

set -e

# Prism installieren, falls nicht vorhanden
if ! command -v prism &> /dev/null; then
  echo "Prism CLI nicht gefunden. Installiere..."
  npm install -g @stoplight/prism-cli
fi

# OpenAPI-Spec Pfad
OPENAPI_SPEC="infra/openapi/restaurant-api.yml"
PORT=4000

if [ ! -f "$OPENAPI_SPEC" ]; then
  echo "OpenAPI-Spec $OPENAPI_SPEC nicht gefunden!"
  exit 1
fi

echo "Starte Prism-Mock-Server auf Port $PORT mit $OPENAPI_SPEC ..."
prism mock "$OPENAPI_SPEC" --port $PORT
