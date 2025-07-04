#!/usr/bin/env node

// Elasticsearch Initialization Script für UberEats Integration
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
});

const RESTAURANT_INDEX_MAPPING = {
  mappings: {
    properties: {
      name: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: { type: 'keyword' },
          suggest: { type: 'search_as_you_type' }
        }
      },
      description: { type: 'text', analyzer: 'standard' },
      cuisine_type: {
        type: 'text',
        fields: { keyword: { type: 'keyword' } }
      },
      price_level: { type: 'integer' },
      rating: { type: 'float' },
      delivery_time: { type: 'integer' },
      delivery_fee: { type: 'float' },
      minimum_order: { type: 'float' },
      location: { type: 'geo_point' },
      image_url: { type: 'keyword', index: false },
      opening_hours: {
        type: 'object',
        properties: {
          monday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          tuesday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          wednesday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          thursday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          friday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          saturday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } },
          sunday: { properties: { open: { type: 'keyword' }, close: { type: 'keyword' } } }
        }
      },
      features: { type: 'keyword' },
      menu_items: {
        type: 'nested',
        properties: {
          id: { type: 'keyword' },
          name: {
            type: 'text',
            analyzer: 'standard',
            fields: { keyword: { type: 'keyword' } }
          },
          description: { type: 'text' },
          price: { type: 'float' },
          category: { type: 'keyword' },
          image_url: { type: 'keyword', index: false },
          allergens: { type: 'keyword' },
          modifiers: {
            type: 'nested',
            properties: {
              id: { type: 'keyword' },
              name: { type: 'text', fields: { keyword: { type: 'keyword' } } },
              type: { type: 'keyword' },
              required: { type: 'boolean' },
              options: {
                type: 'nested',
                properties: {
                  id: { type: 'keyword' },
                  name: { type: 'text', fields: { keyword: { type: 'keyword' } } },
                  price: { type: 'float' }
                }
              }
            }
          }
        }
      },
      suggest: {
        type: 'completion',
        analyzer: 'simple',
        preserve_separators: true,
        preserve_position_increments: true,
        max_input_length: 50
      },
      created_at: { type: 'date' },
      updated_at: { type: 'date' }
    }
  },
  settings: {
    analysis: {
      analyzer: {
        autocomplete: {
          tokenizer: 'autocomplete',
          filter: ['lowercase']
        },
        autocomplete_search: {
          tokenizer: 'keyword',
          filter: ['lowercase']
        }
      },
      tokenizer: {
        autocomplete: {
          type: 'edge_ngram',
          min_gram: 2,
          max_gram: 10,
          token_chars: ['letter', 'digit']
        }
      }
    }
  }
};

const SAMPLE_RESTAURANTS = [
  {
    id: 'rest_1',
    name: 'Pizza Palace Wien',
    description: 'Authentische italienische Pizza mit frischen Zutaten direkt aus dem Steinofen.',
    cuisine_type: 'Italienisch',
    price_level: 2,
    rating: 4.5,
    delivery_time: 25,
    delivery_fee: 2.99,
    minimum_order: 12.00,
    location: { lat: 48.2082, lon: 16.3738 },
    image_url: 'https://example.com/images/pizza-palace.jpg',
    opening_hours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '24:00' },
      saturday: { open: '11:00', close: '24:00' },
      sunday: { open: '12:00', close: '22:00' }
    },
    features: ['Lieferung', 'Vegetarisch', 'Vegan-Optionen'],
    menu_items: [
      {
        id: 'item_1',
        name: 'Pizza Margherita',
        description: 'Klassische Pizza mit Tomatensauce, Mozzarella und frischem Basilikum',
        price: 9.50,
        category: 'Pizza',
        allergens: ['Gluten', 'Milch'],
        modifiers: [
          {
            id: 'size_mod',
            name: 'Größe',
            type: 'single',
            required: true,
            options: [
              { id: 'small', name: 'Klein (26cm)', price: 0 },
              { id: 'medium', name: 'Mittel (30cm)', price: 2.50 },
              { id: 'large', name: 'Groß (34cm)', price: 4.50 }
            ]
          },
          {
            id: 'toppings_mod',
            name: 'Extra Beläge',
            type: 'multiple',
            required: false,
            options: [
              { id: 'extra_cheese', name: 'Extra Käse', price: 1.50 },
              { id: 'mushrooms', name: 'Pilze', price: 1.00 },
              { id: 'pepperoni', name: 'Pepperoni', price: 2.00 }
            ]
          }
        ]
      },
      {
        id: 'item_2',
        name: 'Pizza Salami',
        description: 'Pizza mit würziger Salami und Mozzarella',
        price: 11.50,
        category: 'Pizza',
        allergens: ['Gluten', 'Milch'],
        modifiers: [
          {
            id: 'size_mod',
            name: 'Größe',
            type: 'single',
            required: true,
            options: [
              { id: 'small', name: 'Klein (26cm)', price: 0 },
              { id: 'medium', name: 'Mittel (30cm)', price: 2.50 },
              { id: 'large', name: 'Groß (34cm)', price: 4.50 }
            ]
          }
        ]
      }
    ],
    suggest: {
      input: ['Pizza Palace Wien', 'Pizza', 'Italienisch', 'Pizza Margherita', 'Pizza Salami']
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'rest_2',
    name: 'Sushi World',
    description: 'Frisches Sushi und japanische Spezialitäten von erfahrenen Sushi-Meistern.',
    cuisine_type: 'Japanisch',
    price_level: 4,
    rating: 4.8,
    delivery_time: 35,
    delivery_fee: 3.99,
    minimum_order: 20.00,
    location: { lat: 48.2085, lon: 16.3721 },
    image_url: 'https://example.com/images/sushi-world.jpg',
    opening_hours: {
      monday: { open: '17:00', close: '22:00' },
      tuesday: { open: '17:00', close: '22:00' },
      wednesday: { open: '17:00', close: '22:00' },
      thursday: { open: '17:00', close: '22:00' },
      friday: { open: '17:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:00' }
    },
    features: ['Premium', 'Glutenfrei-Optionen', 'Frisch'],
    menu_items: [
      {
        id: 'item_3',
        name: 'Sushi Mix Box',
        description: '12 Stück gemischtes Sushi mit Lachs, Thunfisch und Garnelen',
        price: 18.90,
        category: 'Sushi',
        allergens: ['Fisch', 'Krebstiere'],
        modifiers: [
          {
            id: 'wasabi_mod',
            name: 'Beilagen',
            type: 'multiple',
            required: false,
            options: [
              { id: 'extra_wasabi', name: 'Extra Wasabi', price: 0.50 },
              { id: 'extra_ginger', name: 'Extra Ingwer', price: 0.50 },
              { id: 'soy_sauce', name: 'Sojasauce', price: 0.00 }
            ]
          }
        ]
      }
    ],
    suggest: {
      input: ['Sushi World', 'Sushi', 'Japanisch', 'Sushi Mix Box']
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'rest_3',
    name: 'Burger Boutique',
    description: 'Handgemachte Gourmet-Burger mit regionalen Zutaten.',
    cuisine_type: 'Amerikanisch',
    price_level: 3,
    rating: 4.2,
    delivery_time: 20,
    delivery_fee: 1.99,
    minimum_order: 15.00,
    location: { lat: 48.2100, lon: 16.3700 },
    image_url: 'https://example.com/images/burger-boutique.jpg',
    opening_hours: {
      monday: { open: '11:30', close: '22:00' },
      tuesday: { open: '11:30', close: '22:00' },
      wednesday: { open: '11:30', close: '22:00' },
      thursday: { open: '11:30', close: '22:00' },
      friday: { open: '11:30', close: '23:00' },
      saturday: { open: '11:30', close: '23:00' },
      sunday: { open: '12:00', close: '21:00' }
    },
    features: ['Bio', 'Regional', 'Vegetarisch'],
    menu_items: [
      {
        id: 'item_4',
        name: 'Classic Cheeseburger',
        description: 'Saftiger Rindfleisch-Patty mit Cheddar, Salat, Tomaten und Spezial-Sauce',
        price: 12.90,
        category: 'Burger',
        allergens: ['Gluten', 'Milch', 'Ei'],
        modifiers: [
          {
            id: 'doneness_mod',
            name: 'Garstufe',
            type: 'single',
            required: true,
            options: [
              { id: 'medium_rare', name: 'Medium Rare', price: 0 },
              { id: 'medium', name: 'Medium', price: 0 },
              { id: 'well_done', name: 'Well Done', price: 0 }
            ]
          },
          {
            id: 'sides_mod',
            name: 'Beilage',
            type: 'single',
            required: true,
            options: [
              { id: 'fries', name: 'Pommes Frites', price: 0 },
              { id: 'sweet_potato', name: 'Süßkartoffel-Pommes', price: 1.50 },
              { id: 'onion_rings', name: 'Zwiebelringe', price: 2.00 }
            ]
          }
        ]
      }
    ],
    suggest: {
      input: ['Burger Boutique', 'Burger', 'Amerikanisch', 'Classic Cheeseburger']
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

async function initializeElasticsearch() {
  try {
    console.log('🔍 Initialisiere Elasticsearch für UberEats...');

    // Prüfe Elasticsearch-Verbindung
    const health = await client.cluster.health();
    console.log(`✅ Elasticsearch Status: ${health.body.status}`);

    // Lösche Index falls vorhanden (nur für Development)
    try {
      await client.indices.delete({ index: 'restaurants' });
      console.log('🗑️  Alter restaurants Index gelöscht');
    } catch (error) {
      // Index existiert nicht, das ist ok
    }

    // Erstelle restaurants Index
    await client.indices.create({
      index: 'restaurants',
      body: RESTAURANT_INDEX_MAPPING
    });
    console.log('✅ Restaurants Index erstellt');

    // Indexiere Sample-Restaurants
    for (const restaurant of SAMPLE_RESTAURANTS) {
      await client.index({
        index: 'restaurants',
        id: restaurant.id,
        body: restaurant
      });
      console.log(`📍 Restaurant indexiert: ${restaurant.name}`);
    }

    // Refresh Index
    await client.indices.refresh({ index: 'restaurants' });
    console.log('🔄 Index aktualisiert');

    // Prüfe Indexierung
    const count = await client.count({ index: 'restaurants' });
    console.log(`📊 ${count.body.count} Restaurants indexiert`);

    // Test-Suche
    const searchResult = await client.search({
      index: 'restaurants',
      body: {
        query: { match: { name: 'pizza' } }
      }
    });
    console.log(`🔍 Test-Suche: ${searchResult.body.hits.total.value} Treffer für "pizza"`);

    console.log('🎉 Elasticsearch Initialisierung erfolgreich abgeschlossen!');
    console.log('');
    console.log('Verfügbare Endpunkte:');
    console.log('  GET http://localhost:9200/restaurants/_search - Suche in Restaurants');
    console.log('  GET http://localhost:5601 - Kibana Dashboard');
    console.log('');

  } catch (error) {
    console.error('❌ Elasticsearch Initialisierung fehlgeschlagen:', error);
    process.exit(1);
  }
}

// Führe Initialisierung aus
if (require.main === module) {
  initializeElasticsearch();
}

module.exports = { initializeElasticsearch, RESTAURANT_INDEX_MAPPING, SAMPLE_RESTAURANTS };