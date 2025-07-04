#!/bin/bash

# UBEREATS INTEGRATION AUTOMATION SCRIPT
# Dieser Script führt die komplette UberEats Integration automatisch aus

set -e

echo "🚀 Starte UberEats Integration Automation..."
echo "================================================"

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funktion für farbigen Output
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${BLUE}[SUCCESS]${NC} $1"
}

# Prüfe Node.js Version
log "Prüfe Node.js Version..."
node_version=$(node -v)
if [[ $node_version < "v18" ]]; then
    error "Node.js 18+ erforderlich. Aktuelle Version: $node_version"
    exit 1
fi
success "Node.js Version OK: $node_version"

# Installiere Dependencies
log "Installiere NPM Dependencies..."
npm install
success "Dependencies installiert"

# Erstelle .env Datei falls nicht vorhanden
if [ ! -f .env ]; then
    log "Erstelle .env Datei..."
    cat > .env << EOF
# Database
DATABASE_URL=postgresql://dev:dev123@localhost:5432/ubereats_dev
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200

# API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
GOOGLE_MAPS_API_KEY=your_google_maps_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# External Services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SENDGRID_API_KEY=your_sendgrid_key

# Feature Flags
ENABLE_ELASTICSEARCH=true
ENABLE_LIVE_TRACKING=true
ENABLE_GROUP_ORDERS=true
ENABLE_PHOTO_REVIEWS=true
EOF
    success ".env Datei erstellt"
else
    log ".env Datei bereits vorhanden"
fi

# Starte Docker Services
log "Starte Docker Services (Postgres, Redis, Elasticsearch)..."
if command -v docker-compose &> /dev/null; then
    docker-compose -f docker-compose.ubereats.yml up -d postgres redis elasticsearch
    success "Docker Services gestartet"
else
    warn "Docker Compose nicht gefunden. Bitte starten Sie die Services manuell:"
    echo "  - PostgreSQL auf Port 5432"
    echo "  - Redis auf Port 6379" 
    echo "  - Elasticsearch auf Port 9200"
fi

# Warte auf Services
log "Warte auf Service-Verfügbarkeit..."
sleep 10

# Führe Datenbankmigrationen aus
log "Führe Datenbankmigrationen aus..."
npm run db:migrate

# Seed Testdaten
log "Füge Testdaten ein..."
npm run db:seed

# Generiere TypeScript Typen
log "Generiere TypeScript Typen..."
npm run generate:types

# Führe Tests aus
log "Führe Tests aus..."
npm run test:unit
npm run test:integration

# Baue Services
log "Baue alle Services..."
npm run build

# Starte Services
log "Starte UberEats Services..."
npm run dev:ubereats &

# Warte auf Service-Start
sleep 15

# Prüfe Service-Health
log "Prüfe Service Health..."
health_check() {
    local url=$1
    local service=$2
    
    if curl -f -s "$url" > /dev/null; then
        success "$service ist verfügbar"
        return 0
    else
        error "$service ist nicht verfügbar unter $url"
        return 1
    fi
}

health_check "http://localhost:3000/health" "API Gateway"
health_check "http://localhost:3001/health" "Search Service"
health_check "http://localhost:3010" "Customer App"

# Initialisiere Elasticsearch Index
log "Initialisiere Elasticsearch Indizes..."
curl -X PUT "localhost:9200/restaurants" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "name": {"type": "text", "analyzer": "standard"},
      "description": {"type": "text"},
      "cuisine_type": {"type": "keyword"},
      "price_level": {"type": "integer"},
      "rating": {"type": "float"},
      "delivery_time": {"type": "integer"},
      "location": {"type": "geo_point"},
      "menu_items": {
        "type": "nested",
        "properties": {
          "name": {"type": "text"},
          "description": {"type": "text"},
          "price": {"type": "float"},
          "category": {"type": "keyword"}
        }
      }
    }
  }
}'

success "Elasticsearch Index erstellt"

# Führe E2E Tests aus
log "Führe End-to-End Tests aus..."
npm run test:e2e

echo ""
echo "================================================"
success "🎉 UberEats Integration erfolgreich abgeschlossen!"
echo ""
echo "Verfügbare Services:"
echo "  📱 Customer App:    http://localhost:3010"
echo "  🚗 Driver App:      http://localhost:3011" 
echo "  ⚙️  Admin Panel:     http://localhost:3012"
echo "  🔌 API Gateway:     http://localhost:3000"
echo "  🔍 Search API:      http://localhost:3001"
echo "  📊 Elasticsearch:   http://localhost:9200"
echo "  📈 Kibana:          http://localhost:5601"
echo ""
echo "API Dokumentation:   http://localhost:3000/docs"
echo "Storybook:           http://localhost:6006"
echo ""
echo "Nächste Schritte:"
echo "  1. Öffnen Sie http://localhost:3010 für die Customer App"
echo "  2. Registrieren Sie einen Test-Account"
echo "  3. Durchsuchen Sie Restaurants"
echo "  4. Testen Sie eine Bestellung"
echo "  5. Verfolgen Sie die Live-Lieferung"
echo ""
echo "Für Entwicklung:"
echo "  npm run dev        # Alle Services starten"
echo "  npm run test       # Tests ausführen"
echo "  npm run lint       # Code-Qualität prüfen"
echo "  npm run storybook  # UI-Komponenten testen"