#!/usr/bin/env bash
# Vault Policy Simulation
vault token create -policy=ci-policy -role=github-actions
vault kv get secret/data/app/credentials

# GitHub Actions Dry-Run
act -j build --secret VAULT_ADDR=$VAULT_ADDR --secret VAULT_ROLE=github-actions

# K8s Injector Test
kubectl apply -f ../k8s/vault-agent.yaml --dry-run=client
