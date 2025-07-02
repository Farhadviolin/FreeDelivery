#!/bin/bash
# Erweiterte Doku-Generierung: Swagger2Markdown, Architekturdiagramme als SVG
set -e

# Generate OpenAPI Markdown
npx swagger2markdown backend/api-gateway/api/openapi.json -o docs/API.md

# Generate PlantUML SVG diagrams
for f in docs/*.puml; do
  java -jar plantuml.jar -tsvg "$f"
done
