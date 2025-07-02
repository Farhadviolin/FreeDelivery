# Edge Model Fleet Management – Konzept

## Ziele
- Versionierung und Rollout von Edge-Modellen an mobile Geräte
- Rückruf/Deaktivierung fehlerhafter Modelle
- Telemetrie über Modellnutzung und -performance

## Komponenten
- Artifact Store (z.B. S3, Firebase Storage)
- Version-Manifest (JSON, z.B. https://cdn.delivery.com/edge_models/manifest.json)
- Mobile App: prüft Manifest, lädt/aktualisiert Modell
- Telemetrie: Pushgateway für Nutzungsdaten

## Beispiel-Manifest
```json
{
  "models": [
    {"version": "v1.0.0", "url": "https://cdn.delivery.com/edge_models/v1.0.0.tflite", "active": true},
    {"version": "v0.9.0", "url": "https://cdn.delivery.com/edge_models/v0.9.0.tflite", "active": false}
  ]
}
```

## Rollout-Prozess
1. Neues Modell bauen und ins CDN hochladen
2. Manifest aktualisieren ("active": true)
3. App prüft Manifest, lädt neues Modell bei Bedarf
4. Alte Modelle können per "active": false deaktiviert werden

## Rückruf/Deaktivierung
- Setze "active": false im Manifest
- App löscht/ignoriert inaktive Modelle

## Telemetrie
- App sendet Modellversion, Latenz, Fehler an Pushgateway
- Monitoring via Prometheus/Grafana
