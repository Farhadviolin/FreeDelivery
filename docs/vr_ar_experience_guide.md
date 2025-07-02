# VR/AR Gastronomie-Erlebnis – User Guide

## Übersicht
Dieses System ermöglicht immersive Restaurant-Touren und AR-Menüvorschau für Web, Mobile und VR-Headsets.

## Komponenten
- **Content-API (FastAPI):** Liefert 360°-Medien-URLs aus S3
- **WebXR-Viewer (Three.js):** Browserbasierte 360°-Tour
- **ViroReact AR-Komponente:** Mobile AR-Menüvorschau
- **Unity VR-Loader:** Native VR-Headset-Unterstützung
- **CI/CD:** Automatisierte Tests, Builds und Deployment
- **Monitoring:** Prometheus/Grafana für Nutzungsmetriken

## Nutzung
1. **Content-API starten:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   curl http://localhost:8000/content/360/r1
   ```
2. **WebXR-Viewer testen:**
   ```bash
   npm run dev:webxr
   # öffne public/js/viewer.js im Browser
   ```
3. **ViroReact App starten:**
   ```bash
   npm run start
   # Komponente: ViroARScene.js
   ```
4. **Unity VR Build:**
   ```bash
   /Applications/Unity/Hub/Editor/2024.1.0f1/Unity -projectPath . -buildTarget Android -executeMethod BuildScript.PerformBuild
   ```
5. **CI/CD-Workflow:**
   - Siehe `.github/workflows/ci-vr-ar-experience.yml`

## Anpassung
- 360°-Medien in S3 hochladen (Struktur: <restaurant_id>/360/)
- Social-Features, Chat, Interaktionen in WebXR/Unity/ViroReact ergänzen
- Monitoring/Alerts in Prometheus/Grafana konfigurieren
