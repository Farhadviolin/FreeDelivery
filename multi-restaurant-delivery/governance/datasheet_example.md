# Datasheet for Dataset: User Features

## Motivation
- Zweck: Training von Segmentierungs- und Propensity-Modellen
- Ersteller: Data Science Team
- Erstellungsdatum: 2025-06-01

## Composition
- Spalten: user_id, age, gender, order_count, last_order, ...
- Herkunft: PostgreSQL, Event-Streams
- Anonymisierung: Ja

## Collection Process
- Automatisiert via ETL
- DSGVO-konform

## Preprocessing
- Null-Handling, Feature-Scaling

## Distribution
- Intern, Zugriffskontrolle

## Maintenance
- Monatliches Review, Data Lineage dokumentiert
