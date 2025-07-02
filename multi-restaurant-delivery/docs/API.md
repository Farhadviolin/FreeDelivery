# KiLiefer API Dokumentation

## OpenAPI/Swagger
Alle REST-Endpoints sind automatisch dokumentiert unter `/docs` (Swagger UI) und `/openapi.json` (OpenAPI Spec) im laufenden Backend.

### Beispiel-Endpoints
- `POST /api/auth/register` – Registrierung
- `POST /api/auth/token` – Login (JWT)
- `GET /api/restaurants` – Restaurant-Liste
- `GET /api/orders` – Bestellungen (auth)
- `POST /api/orders` – Bestellung anlegen
- `GET /api/menus/{restaurant_id}` – Menü
- `POST /api/menus/{restaurant_id}` – Menüpunkt anlegen (Restaurant-Admin)
- `POST /api/payment/pay` – Payment (Stripe/PayPal/Mock)
- `POST /api/2fa/request` – 2FA-Code anfordern
- `POST /api/2fa/verify` – 2FA-Code prüfen
- `GET /api/gdpr/export` – Datenexport (DSGVO)
- `POST /api/gdpr/delete` – Account löschen (DSGVO)
- `POST /api/gdpr/consent` – Consent setzen (DSGVO)
- `GET /metrics` – Prometheus Metrics
- `GET /ws/status` – Websocket für Live-Status

## Authentifizierung
- JWT-Token im `Authorization`-Header: `Bearer <token>`

## Fehlerbehandlung
- Fehler werden als JSON mit `detail`-Feld zurückgegeben.

## Mehrsprachigkeit
- `accept-language`-Header für Response-Sprache (de, en, fr, es)
