#!/usr/bin/env bash
# Simuliere Ausfall des Primary-Cluster
kubectl cordon worker-node-1
velero backup create dr-test --include-namespaces delivery
velero restore create dr-restore --from-backup dr-test --namespace-mappings delivery:recovery
# Warte auf Ressourcen
kubectl wait --for=condition=available deployment --all -n recovery --timeout=5m
