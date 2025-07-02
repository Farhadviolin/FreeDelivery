# fluxcd install
helm repo add fluxcd https://charts.fluxcd.io
helm upgrade --install flux fluxcd/flux2 --namespace flux-system --create-namespace
kubectl apply -f flux-system/
flux get kustomizations

# gatekeeper install
helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
helm upgrade --install gatekeeper gatekeeper/gatekeeper --version v3.9.0
kubectl apply -f constrainttemplates/ -f constraints/
