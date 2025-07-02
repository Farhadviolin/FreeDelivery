# Quantum-Safe Crypto Migration Roadmap

## Phase 1: Vorbereitung & Test
- PQC-Builds (OpenSSL+liboqs, Node Addon) in CI
- PQC-TLS-Profile in Staging-Envoy/Ingress
- Kompatibilitätstests mit bestehenden Clients

## Phase 2: Hybrid Rollout
- Hybrid TLS (klassisch + PQC) für Edge/Load Balancer
- PQC-JWT-Signaturen für interne Services
- Monitoring: PQC-Handshake-Rate, Fehler, Performance

## Phase 3: Produktion & Optimierung
- PQC-only für kritische APIs und interne Kommunikation
- PQC-Policies in Istio/Envoy enforced
- Regelmäßige Updates der PQC-Algorithmen
- Audit & Compliance-Reporting

## Phase 4: Zukunftssicherung
- Beobachtung NIST/PQC-Standardisierung
- Integration neuer Algorithmen (z.B. NTRU, Falcon)
- Awareness-Trainings für Devs & Ops
