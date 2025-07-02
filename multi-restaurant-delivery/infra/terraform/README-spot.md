# CLI-Befehle für Spot-Node-Groups & Autoscaler

## Terraform für EKS Node Groups
cd infra/terraform && terraform apply -target=aws_eks_node_group.spot --auto-approve

## Autoscaler anwenden
kubectl apply -f ../k8s/cluster-autoscaler.yaml

## Batch Deployment neu starten
kubectl rollout restart deployment batch-worker

## Spot-Node-Überwachung
kubectl get nodes -l lifecycle=spot

## Prometheus-Spot-Ratio prüfen
kubectl port-forward svc/prometheus 9090:9090 &
curl 'http://localhost:9090/api/v1/query?query=aws_spot_node_ratio'

## Fallback-Test (Spot-Node terminieren)
aws ec2 terminate-instances --instance-ids <spot-node-id>
# → Pods sollten auf On-Demand-Nodes umziehen
