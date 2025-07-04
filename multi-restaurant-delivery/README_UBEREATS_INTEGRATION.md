# 🍔 UberEats.at Vollständige Integration - Anleitung

## 🚀 Ein-Befehl Installation

```bash
# Alles automatisch installieren und starten:
npm run ubereats:integrate-all
```

## 📋 Was wird integriert?

### ✅ Kern-UberEats Funktionen
- [x] **Restaurant-Suche & Filter** - Erweiterte Elasticsearch-basierte Suche
- [x] **Menü-Modifikatoren** - Größen, Extras, Anpassungen
- [x] **Persistenter Warenkorb** - Redis-basiert, über Sessions hinweg
- [x] **Live GPS Tracking** - WebSocket-basiertes Echtzeit-Tracking
- [x] **Multi-Payment** - Stripe, PayPal, Apple Pay, Google Pay Integration
- [x] **Foto-Reviews** - Erweiterte Bewertungen mit Bildern
- [x] **Allergene & Nährwerte** - Vollständige Allergen-Kennzeichnung
- [x] **Gruppenbuchungen** - Mehrere Personen bestellen gemeinsam
- [x] **Autocomplete-Suche** - Intelligente Suchvorschläge
- [x] **Geo-basierte Lieferung** - Automatische Standorterkennung

### 🆕 Erweiterte Features
- [x] **A11y Accessibility** - Vollständige Barrierefreiheit
- [x] **Progressive Web App** - Mobile-optimiert mit Offline-Support
- [x] **Real-time Notifications** - Push-Benachrichtigungen
- [x] **Multi-Tenant** - Mehrere Mandanten/Städte
- [x] **Advanced Analytics** - Detaillierte Tracking & Reporting
- [x] **API Rate Limiting** - Schutz vor Missbrauch
- [x] **GDPR Compliance** - Vollständige DSGVO-Konformität

## 🛠️ Setup-Anleitung

### 1. Voraussetzungen
```bash
# Node.js 18+ installiert
node --version  # sollte v18+ anzeigen

# Docker installiert
docker --version

# Git Repository geklont
cd multi-restaurant-delivery
```

### 2. Automatische Installation
```bash
# Vollständige UberEats Integration
npm run ubereats:integrate-all

# Alternative: Schritt für Schritt
npm run ubereats:setup          # Dependencies & Services
npm run dev:ubereats           # Entwicklungsserver starten
```

### 3. Manuelle Installation (falls Automatik fehlschlägt)
```bash
# 1. Dependencies installieren
npm install

# 2. Docker Services starten
docker-compose -f docker-compose.ubereats.yml up -d

# 3. Datenbankmigrationen
npm run db:migrate

# 4. Elasticsearch initialisieren
npm run elasticsearch:init

# 5. Testdaten einfügen
npm run db:seed

# 6. Services starten
npm run dev:ubereats
```

## 🌐 Verfügbare Endpoints

### Frontend-Anwendungen
| Service | URL | Beschreibung |
|---------|-----|--------------|
| **Customer App** | http://localhost:3010 | Haupt-Bestellapp für Kunden |
| **Driver App** | http://localhost:3011 | Fahrer-Dashboard |
| **Admin Panel** | http://localhost:3012 | Restaurant-/Admin-Verwaltung |

### Backend-APIs
| Service | URL | Beschreibung |
|---------|-----|--------------|
| **API Gateway** | http://localhost:3000 | Haupt-API & Dokumentation |
| **Search Service** | http://localhost:3001 | Elasticsearch-Suche |
| **Cart Service** | http://localhost:3002 | Warenkorb-Management |
| **Order Service** | http://localhost:3003 | Bestellabwicklung |

### Entwicklungstools
| Service | URL | Beschreibung |
|---------|-----|--------------|
| **API Docs** | http://localhost:3000/docs | Swagger/OpenAPI Dokumentation |
| **Storybook** | http://localhost:6006 | UI-Komponenten |
| **Elasticsearch** | http://localhost:9200 | Suchindex |
| **Kibana** | http://localhost:5601 | Elasticsearch Dashboard |
| **Grafana** | http://localhost:3013 | Monitoring Dashboard |
| **PgAdmin** | http://localhost:5050 | Datenbank-Admin |

## 📱 Funktionen testen

### 1. Restaurant-Suche
```bash
# Gehe zu: http://localhost:3010
# - Suche nach "Pizza", "Sushi", "Burger"
# - Teste Filter: Küche, Preis, Bewertung, Lieferzeit
# - Prüfe Autocomplete-Funktionen
```

### 2. Bestellung mit Modifikatoren
```bash
# 1. Restaurant auswählen
# 2. Menu Item hinzufügen
# 3. Modifikatoren testen (Größe, Extras)
# 4. Allergene prüfen
# 5. In Warenkorb legen
```

### 3. Live-Tracking
```bash
# Nach Bestellung:
# - WebSocket-Verbindung wird automatisch aufgebaut
# - Live GPS-Position des Fahrers
# - Geschätzte Lieferzeit Updates
# - Push-Benachrichtigungen
```

## 🧪 Tests ausführen

```bash
# Alle Tests
npm run test:ubereats

# Einzelne Test-Suites
npm run test:unit           # Unit Tests
npm run test:integration    # Integration Tests  
npm run test:e2e           # End-to-End Tests

# Linting & Code-Qualität
npm run lint
npm run format
```

## 🔧 Entwicklung

### Code-Struktur
```
multi-restaurant-delivery/
├── backend/
│   ├── search-service/     # 🆕 Elasticsearch-Suche
│   ├── cart-service/       # 🆕 Persistenter Warenkorb
│   ├── api-gateway/        # ✅ Erweitert um neue APIs
│   └── ...
├── frontend/
│   ├── components/
│   │   ├── Search/         # 🆕 Erweiterte Suchkomponenten
│   │   ├── Filters/        # 🆕 Restaurant-Filter
│   │   ├── Cart/           # 🆕 Persistenter Warenkorb
│   │   └── ...
│   └── services/
│       ├── search.service.ts    # 🆕 Suche-API Client
│       └── cart.service.ts      # 🆕 Warenkorb-Client
├── database/
│   └── migrations/         # 🆕 UberEats Schema-Erweiterungen
└── scripts/
    ├── ubereats-integration.sh  # 🆕 Automatisierung
    └── init-elasticsearch.js    # 🆕 ES Initialisierung
```

### Neue APIs nutzen

#### Restaurant-Suche
```typescript
import { searchService } from '../services/search.service';

// Einfache Textsuche
const results = await searchService.searchRestaurants({
  text: 'pizza'
});

// Erweiterte Suche mit Filtern
const filtered = await searchService.searchRestaurants({
  text: 'sushi',
  cuisine: ['Japanisch'],
  priceRange: [2, 4],
  rating: 4,
  deliveryTime: 30,
  location: { lat: 48.2082, lng: 16.3738, radius: 5 },
  sortBy: 'rating'
});

// Autocomplete
const suggestions = await searchService.autocomplete('piz');
```

#### Warenkorb-Management
```typescript
import { cartService } from '../services/cart.service';

// Item hinzufügen
await cartService.addItem({
  restaurantId: 'rest_1',
  menuItemId: 'item_1',
  name: 'Pizza Margherita',
  price: 9.50,
  quantity: 1,
  modifiers: [
    { id: 'size_large', name: 'Groß', price: 4.50 }
  ]
});

// Warenkorb abrufen
const cart = await cartService.getCart();

// Anzahl ändern
await cartService.updateQuantity('item_id', 2);
```

### Komponenten verwenden

#### Suchleiste
```tsx
import { SearchBar } from '../components/Search/SearchBar';

<SearchBar
  onSearch={(query) => handleSearch(query)}
  placeholder="Nach Restaurants suchen..."
/>
```

#### Filter
```tsx
import { RestaurantFilters } from '../components/Filters/RestaurantFilters';

<RestaurantFilters
  filters={filters}
  onFiltersChange={setFilters}
  aggregations={searchResults.aggregations}
/>
```

## 🚀 Deployment

### Entwicklung
```bash
npm run dev:ubereats
```

### Produktion
```bash
# Build
npm run build:ubereats

# Docker Images erstellen
npm run docker:build

# Kubernetes Deployment
npm run k8s:deploy
```

### Umgebungsvariablen
```bash
# .env Datei erstellen
cp .env.example .env

# Wichtige Variablen:
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
ELASTICSEARCH_URL=http://...
STRIPE_SECRET_KEY=sk_...
GOOGLE_MAPS_API_KEY=...
MAPBOX_ACCESS_TOKEN=...
```

## 📊 Monitoring & Analytics

### Verfügbare Dashboards
- **Grafana**: http://localhost:3013 (admin/admin123)
  - Restaurant-Performance
  - Suchanalytics
  - Warenkorbanalyse
  - API-Metriken

### Logs & Debugging
```bash
# Service-Logs anzeigen
docker-compose -f docker-compose.ubereats.yml logs -f api-gateway
docker-compose -f docker-compose.ubereats.yml logs -f search-service

# Elasticsearch-Queries debuggen
curl "http://localhost:9200/restaurants/_search?pretty" -H "Content-Type: application/json" -d'
{
  "query": { "match": { "name": "pizza" } }
}'
```

## 🔒 Sicherheit

### Implementierte Sicherheitsmaßnahmen
- **Rate Limiting** - API-Schutz vor Missbrauch
- **JWT Authentication** - Sichere Benutzeranmeldung
- **Input Validation** - Schutz vor XSS/SQL Injection
- **CORS Configuration** - Sichere Cross-Origin Requests
- **Helmet.js** - HTTP-Security Headers
- **HTTPS/TLS** - Verschlüsselte Kommunikation

### Compliance
- **GDPR/DSGVO** - Vollständige Datenschutz-Konformität
- **PCI DSS** - Sichere Zahlungsabwicklung
- **Accessibility** - WCAG 2.1 AA konform

## 🆘 Troubleshooting

### Häufige Probleme

#### Services starten nicht
```bash
# Docker Services prüfen
docker-compose -f docker-compose.ubereats.yml ps

# Services neustarten
docker-compose -f docker-compose.ubereats.yml restart

# Logs prüfen
docker-compose -f docker-compose.ubereats.yml logs
```

#### Elasticsearch Probleme
```bash
# ES Status prüfen
curl http://localhost:9200/_cluster/health

# Index neu erstellen
node scripts/init-elasticsearch.js

# Kibana für Debugging nutzen
# http://localhost:5601
```

#### Port-Konflikte
```bash
# Verwendete Ports prüfen
netstat -tulpn | grep LISTEN

# Alternative Ports in docker-compose.ubereats.yml anpassen
```

### Support
- **Dokumentation**: http://localhost:3000/docs
- **Issues**: GitHub Issues für Bug-Reports
- **Entwickler-Chat**: Slack/Discord für Fragen

## 📈 Nächste Schritte

Nach erfolgreichem Setup:

1. **🎨 UI anpassen** - Branding & Design
2. **🗺️ Karten integrieren** - Google Maps/Mapbox
3. **💳 Zahlungen konfigurieren** - Stripe/PayPal Keys
4. **📱 Mobile Apps** - React Native Builds
5. **🚀 Produktiv deployen** - AWS/Azure/GCP

---

**🎉 Glückwunsch! Du hast jetzt eine vollständige UberEats-Clone Funktionalität!**

Alle Features von www.ubereats.at sind jetzt in deinem Projekt verfügbar und einsatzbereit.