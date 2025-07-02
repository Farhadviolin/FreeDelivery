# Gamification & Referral – Architekturdiagramm

```mermaid
flowchart LR
  UI -->|Referral Code| ReferralService
  ReferralService --> PostgreSQL[(Rewards)]
  ReferralService -->|Publish| Kafka[Referral-Events]
  RewardsService --> Redis[(Points Cache)]
  UI -->|Display| LeaderboardService
```
