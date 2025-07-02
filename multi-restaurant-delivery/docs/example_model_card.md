# Model Card: churn-predictor v1.0

**Author:** Jane Doe  
**Created at:** 2025-07-01  

## Description
Predicts customer churn for multi-restaurant delivery platform.

## Data Sources
```json
{"tables": ["orders", "user_profiles"], "features": ["order_count", "last_order_date", "user_segment"]}
```

## Performance Metrics
```json
{"accuracy": 0.91, "f1": 0.89, "auc": 0.93}
```

## Fairness Metrics
```json
{"selection_rate": {"Male": 0.52, "Female": 0.48}, "fpr": {"Male": 0.08, "Female": 0.09}}
```

## Usage Guidelines
Intended Use: Churn risk scoring for retention campaigns.

Limitations: Not for credit scoring or employment decisions.

## Maintenance Plan
Retraining Frequency: Quarterly

Drift Monitoring: Evidently
