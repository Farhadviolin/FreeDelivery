package k8s.security

deny[msg] {
  input.kind == "Pod"
  not input.spec.securityContext.runAsNonRoot
  msg = "Pod must run as non-root user"
}

deny[msg] {
  input.kind == "Deployment"
  container := input.spec.template.spec.containers[_]
  not container.securityContext.allowPrivilegeEscalation == false
  msg = sprintf("Container %v allows privilege escalation", [container.name])
}
