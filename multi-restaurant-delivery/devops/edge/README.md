# 5G Edge & MEC – Architekturdiagramm

```mermaid
flowchart LR
  5G_RAN[OpenAirInterface eNodeB] --> MEC[Edge Cluster (KubeEdge)]
  MEC -->|Service| ARVRApp[(Unity AR/VR)]
  MEC -->|Service| MenuCache[(Redis)] 
  Istio -->|mTLS| CoreCluster
  CoreCluster -->|Sync| MEC
```
