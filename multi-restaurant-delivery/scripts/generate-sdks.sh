#!/usr/bin/env bash
# JavaScript SDK
echo "Generating JavaScript SDK..."
openapi-generator-cli generate -i openapi.yaml -g javascript -o sdks/js
# Python SDK
echo "Generating Python SDK..."
openapi-generator-cli generate -i openapi.yaml -g python -o sdks/py
# Java SDK
echo "Generating Java SDK..."
openapi-generator-cli generate -i openapi.yaml -g java -o sdks/java
