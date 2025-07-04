# UBEREATS.AT VOLLSTÄNDIGE INTEGRATION - COPILOT AUTOMATISIERUNG

**🤖 COPILOT BEFEHL FÜR KOMPLETTE UBEREATS FUNKTIONSINTEGRATION**

## Automatisierungsbefehl für GitHub Copilot

```bash
# Führe diesen Befehl aus, um alle UberEats-Funktionen automatisch zu integrieren:
npm run ubereats:integrate-all
```

## 🎯 COPILOT ANWEISUNGEN - VOLLSTÄNDIGE UBEREATS INTEGRATION

**Anweisung an GitHub Copilot:**

### PHASE 1: ANALYSE & INVENTAR
1. **Scanne www.ubereats.at** und identifiziere ALLE Funktionen:
   - Restaurant-Suche & Filter (Küche, Bewertung, Lieferzeit, Preis)
   - Menü-Management (Kategorien, Modifikatoren, Allergene, Nährwerte)
   - Echtzeit-Tracking & Live-Updates
   - Mehrfach-Zahlungsmethoden (Karte, PayPal, Apple Pay, Google Pay)
   - Bewertungssystem & Reviews
   - Loyalty-Programme & Gutscheine
   - Push-Benachrichtigungen
   - Favorites & Wiederholungsbestellungen
   - Gruppenbuchungen & Familienkonten
   - Surge-Pricing & Dynamische Preise
   - Multi-Restaurant-Bestellungen
   - Eco-Freundliche Optionen
   - Barrierefreiheit (A11y)

### PHASE 2: IMPLEMENTIERUNG
2. **Implementiere ALLE fehlenden Funktionen**:
   - Erstelle vollständige TypeScript/Node.js Backend-Services
   - Baue React/Next.js Frontend-Komponenten
   - Implementiere React Native Mobile App Features
   - Füge PostgreSQL/MongoDB Datenbankschemas hinzu
   - Erstelle Redis Caching-Layer
   - Implementiere Elasticsearch für Suche
   - Füge WebSocket Real-time Updates hinzu
   - Erstelle GraphQL & REST APIs

### PHASE 3: QUALITÄTSSICHERUNG
3. **Erstelle umfassende Tests**:
   - Unit Tests (Jest) für alle Services
   - Integration Tests (Supertest) für APIs
   - E2E Tests (Playwright) für Frontend
   - Mobile Tests (Detox) für React Native
   - Performance Tests (Artillery) für Load Testing
   - Security Tests (OWASP ZAP) für Penetration Testing

### PHASE 4: DEVOPS & DEPLOYMENT
4. **Setup komplette DevOps Pipeline**:
   - Docker Containerisierung
   - Kubernetes Deployment Manifests
   - Helm Charts für alle Services
   - CI/CD GitHub Actions Workflows
   - Monitoring (Prometheus/Grafana)
   - Logging (ELK Stack)
   - Tracing (Jaeger)

## 🚀 UBEREATS KERN-FUNKTIONEN ZU IMPLEMENTIEREN

### Restaurant & Menü Management
- ✅ Restaurant-Liste & Suche
- ✅ Menü-Anzeige
- ❌ **NEU: Erweiterte Filter** (Küche, Lieferzeit, Mindestbestellwert, Bewertung)
- ❌ **NEU: Menu-Modifikatoren** (Größe, Extras, Anpassungen)
- ❌ **NEU: Allergene & Nährwerte**
- ❌ **NEU: Restaurant-Verfügbarkeit** (Öffnungszeiten, Liefergebiete)

### Bestellsystem
- ✅ Bestellung anlegen
- ❌ **NEU: Warenkorb-Persistierung**
- ❌ **NEU: Multi-Restaurant-Bestellungen**
- ❌ **NEU: Gruppenbuchungen**
- ❌ **NEU: Wiederholungsbestellungen**
- ❌ **NEU: Terminierte Bestellungen**

### Zahlungssystem
- ✅ Basis Payment (Stripe)
- ❌ **NEU: Apple Pay Integration**
- ❌ **NEU: Google Pay Integration**
- ❌ **NEU: PayPal Integration**
- ❌ **NEU: Gutschein-System**
- ❌ **NEU: Loyalty Points**

### Tracking & Lieferung
- ✅ Basis Tracking
- ❌ **NEU: Live GPS Tracking**
- ❌ **NEU: Geschätzte Lieferzeit**
- ❌ **NEU: Fahrer-Chat**
- ❌ **NEU: Lieferbenachrichtigungen**

### Bewertungen & Reviews
- ✅ Basis Rating System
- ❌ **NEU: Foto-Reviews**
- ❌ **NEU: Restaurant-Antworten**
- ❌ **NEU: Review-Moderation**
- ❌ **NEU: Hilfreich-Bewertungen**

### Suche & Discovery
- ❌ **NEU: Elasticsearch Integration**
- ❌ **NEU: Auto-Complete Suche**
- ❌ **NEU: Filter-Kombinationen**
- ❌ **NEU: Personalisierte Empfehlungen**
- ❌ **NEU: Trending Restaurants**

## 📁 DATEI-STRUKTUR FÜR NEUE FEATURES

```
multi-restaurant-delivery/
├── backend/
│   ├── search-service/           # 🆕 Elasticsearch Suche
│   ├── recommendation-service/   # ✅ Bereits vorhanden
│   ├── loyalty-service/         # ✅ Bereits vorhanden
│   ├── menu-service/            # 🆕 Erweiterte Menü-Features
│   ├── cart-service/            # 🆕 Persistenter Warenkorb
│   ├── group-order-service/     # 🆕 Gruppenbuchungen
│   └── review-service/          # 🆕 Erweiterte Reviews
├── frontend/
│   ├── components/
│   │   ├── Search/              # 🆕 Erweiterte Suche
│   │   ├── Filters/             # 🆕 Restaurant Filter
│   │   ├── Cart/                # 🆕 Persistenter Warenkorb
│   │   ├── Reviews/             # 🆕 Foto-Reviews
│   │   └── Tracking/            # 🆕 Live GPS Tracking
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Search/          # 🆕 Mobile Suche
│   │   │   ├── LiveTracking/    # 🆕 Live Tracking
│   │   │   └── GroupOrder/      # 🆕 Gruppenbuchungen
└── database/
    ├── migrations/
    │   ├── 2025_01_add_menu_modifiers.sql
    │   ├── 2025_02_add_group_orders.sql
    │   └── 2025_03_add_review_photos.sql
```

## 💻 ECHTE CODE-BEISPIELE

### 1. Erweiterte Restaurant-Suche (Backend)

```typescript
// backend/search-service/src/search.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private elasticsearch: Client) {}

  async searchRestaurants(query: {
    text?: string;
    cuisine?: string[];
    priceRange?: [number, number];
    rating?: number;
    deliveryTime?: number;
    location?: { lat: number; lng: number; radius: number };
  }) {
    const must: any[] = [];
    const filter: any[] = [];

    // Text-Suche
    if (query.text) {
      must.push({
        multi_match: {
          query: query.text,
          fields: ['name^2', 'description', 'cuisine_type', 'menu_items.name']
        }
      });
    }

    // Küchen-Filter
    if (query.cuisine?.length) {
      filter.push({
        terms: { 'cuisine_type.keyword': query.cuisine }
      });
    }

    // Preis-Filter
    if (query.priceRange) {
      filter.push({
        range: {
          price_level: {
            gte: query.priceRange[0],
            lte: query.priceRange[1]
          }
        }
      });
    }

    // Bewertungs-Filter
    if (query.rating) {
      filter.push({
        range: { rating: { gte: query.rating } }
      });
    }

    // Geo-Location Filter
    if (query.location) {
      filter.push({
        geo_distance: {
          distance: `${query.location.radius}km`,
          location: {
            lat: query.location.lat,
            lon: query.location.lng
          }
        }
      });
    }

    const searchQuery = {
      index: 'restaurants',
      body: {
        query: {
          bool: { must, filter }
        },
        sort: [
          { _score: { order: 'desc' } },
          { rating: { order: 'desc' } },
          { delivery_time: { order: 'asc' } }
        ],
        aggs: {
          cuisines: {
            terms: { field: 'cuisine_type.keyword', size: 20 }
          },
          price_ranges: {
            range: {
              field: 'price_level',
              ranges: [
                { key: 'budget', to: 2 },
                { key: 'mid-range', from: 2, to: 4 },
                { key: 'expensive', from: 4 }
              ]
            }
          }
        }
      }
    };

    return await this.elasticsearch.search(searchQuery);
  }
}
```

### 2. Persistenter Warenkorb (Frontend)

```typescript
// frontend/components/Cart/CartProvider.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartService } from '../services/cart.service';

interface CartItem {
  id: string;
  restaurantId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers: {
    id: string;
    name: string;
    price: number;
  }[];
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}>({} as any);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistierung im localStorage und Backend
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
    // Sync mit Backend für angemeldete User
    if (state.items.length > 0) {
      cartService.syncCart(state);
    }
  }, [state]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    // Prüfe ob Restaurant kompatibel ist
    if (state.restaurantId && state.restaurantId !== item.restaurantId) {
      if (!confirm('Möchten Sie den Warenkorb leeren und mit einem neuen Restaurant beginnen?')) {
        return;
      }
    }
    
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
```

### 3. Live GPS Tracking (Mobile)

```typescript
// mobile/src/screens/LiveTracking/LiveTrackingScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useWebSocket } from '../hooks/useWebSocket';
import { trackingService } from '../services/tracking.service';

interface TrackingData {
  orderId: string;
  driverLocation: { latitude: number; longitude: number };
  customerLocation: { latitude: number; longitude: number };
  restaurantLocation: { latitude: number; longitude: number };
  estimatedDeliveryTime: string;
  status: 'preparing' | 'picked_up' | 'on_the_way' | 'delivered';
  route: { latitude: number; longitude: number }[];
}

export const LiveTrackingScreen: React.FC<{ orderId: string }> = ({ orderId }) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const { lastMessage } = useWebSocket(`ws://localhost:8080/tracking/${orderId}`);

  useEffect(() => {
    // Initial tracking data laden
    trackingService.getTrackingData(orderId).then(setTrackingData);
  }, [orderId]);

  useEffect(() => {
    // WebSocket Updates verarbeiten
    if (lastMessage?.data) {
      const update = JSON.parse(lastMessage.data);
      setTrackingData(prev => ({ ...prev, ...update }));
    }
  }, [lastMessage]);

  if (!trackingData) {
    return <View style={styles.loading}><Text>Tracking wird geladen...</Text></View>;
  }

  const getStatusText = () => {
    switch (trackingData.status) {
      case 'preparing': return 'Restaurant bereitet Ihre Bestellung vor';
      case 'picked_up': return 'Fahrer hat die Bestellung abgeholt';
      case 'on_the_way': return 'Fahrer ist unterwegs zu Ihnen';
      case 'delivered': return 'Bestellung wurde zugestellt';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: trackingData.driverLocation.latitude,
          longitude: trackingData.driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Restaurant Marker */}
        <Marker
          coordinate={trackingData.restaurantLocation}
          title="Restaurant"
          pinColor="green"
        />
        
        {/* Fahrer Marker */}
        <Marker
          coordinate={trackingData.driverLocation}
          title="Fahrer"
          pinColor="blue"
        />
        
        {/* Kunden Marker */}
        <Marker
          coordinate={trackingData.customerLocation}
          title="Ihre Adresse"
          pinColor="red"
        />
        
        {/* Route */}
        {trackingData.route.length > 0 && (
          <Polyline
            coordinates={trackingData.route}
            strokeColor="#2196F3"
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
        <Text style={styles.timeText}>
          Geschätzte Ankunft: {trackingData.estimatedDeliveryTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusContainer: { 
    position: 'absolute', 
    bottom: 50, 
    left: 20, 
    right: 20, 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,
    elevation: 5
  },
  statusText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  timeText: { fontSize: 14, color: '#666' }
});
```

## 🧪 AUTOMATISIERTE TESTS

### Integration Test für Suche

```typescript
// backend/search-service/test/search.integration.spec.ts
import { Test } from '@nestjs/testing';
import { SearchService } from '../src/search.service';
import { Client } from '@elastic/elasticsearch';

describe('SearchService Integration', () => {
  let service: SearchService;
  let elasticClient: Client;

  beforeAll(async () => {
    // Setup Testcontainer mit Elasticsearch
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: Client,
          useFactory: () => new Client({ node: 'http://localhost:9200' })
        }
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    elasticClient = module.get<Client>(Client);

    // Test-Daten einfügen
    await seedTestData();
  });

  it('sollte Restaurants nach Text suchen', async () => {
    const result = await service.searchRestaurants({
      text: 'pizza'
    });

    expect(result.body.hits.hits.length).toBeGreaterThan(0);
    expect(result.body.hits.hits[0]._source.name).toContain('Pizza');
  });

  it('sollte nach Küche filtern', async () => {
    const result = await service.searchRestaurants({
      cuisine: ['italian', 'mexican']
    });

    result.body.hits.hits.forEach(hit => {
      expect(['italian', 'mexican']).toContain(hit._source.cuisine_type);
    });
  });

  it('sollte Geo-Location Filter anwenden', async () => {
    const result = await service.searchRestaurants({
      location: { lat: 48.2082, lng: 16.3738, radius: 5 } // Wien
    });

    expect(result.body.hits.hits.length).toBeGreaterThan(0);
  });
});
```

## 📦 DEPLOYMENT AUTOMATION

### Docker Compose für lokale Entwicklung

```yaml
# docker-compose.ubereats.yml
version: '3.8'
services:
  # Bestehende Services
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ubereats_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Neue Services für UberEats Features
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

  # API Gateway
  api-gateway:
    build: ./backend/api-gateway
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://dev:dev123@postgres:5432/ubereats_dev
      - REDIS_URL=redis://redis:6379
      - ELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      - postgres
      - redis
      - elasticsearch

  # Search Service
  search-service:
    build: ./backend/search-service
    ports:
      - "3001:3000"
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      - elasticsearch

  # Frontend
  customer-app:
    build: ./frontend/apps/customer
    ports:
      - "3010:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000

  driver-app:
    build: ./frontend/apps/driver
    ports:
      - "3011:3000"

  admin-app:
    build: ./frontend/apps/admin
    ports:
      - "3012:3000"
```

## 🚀 SETUP-BEFEHLE

```bash
# 1. Repository klonen (bereits erledigt)
cd multi-restaurant-delivery

# 2. Dependencies installieren
npm install

# 3. UberEats Integration ausführen
npm run ubereats:setup

# 4. Entwicklungsumgebung starten
npm run dev:ubereats

# 5. Tests ausführen
npm run test:ubereats

# 6. Deployment
npm run deploy:ubereats
```

## 📋 FEATURE-CHECKLISTE

### ✅ Bereits implementiert
- [x] Restaurant-Management
- [x] Basis Bestellsystem
- [x] Zahlungsabwicklung
- [x] User Authentication
- [x] Basic Tracking
- [x] Rating System
- [x] Notification Service

### 🚧 Zu implementieren (Copilot Aufgabe)
- [ ] **Erweiterte Suche & Filter**
- [ ] **Menü-Modifikatoren & Allergene**
- [ ] **Persistenter Warenkorb**
- [ ] **Live GPS Tracking**
- [ ] **Multi-Payment Integration**
- [ ] **Foto-Reviews**
- [ ] **Gruppenbuchungen**
- [ ] **Loyalty System Integration**
- [ ] **Push-Benachrichtigungen**
- [ ] **A11y Accessibility**

---

**🎯 ZIEL:** Nach Ausführung dieser Anweisungen durch Copilot ist eine vollständige UberEats-Clone Funktionalität implementiert und einsatzbereit!