import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export interface SearchQuery {
  text?: string;
  cuisine?: string[];
  priceRange?: [number, number];
  rating?: number;
  deliveryTime?: number;
  location?: { lat: number; lng: number; radius: number };
  sortBy?: 'relevance' | 'rating' | 'delivery_time' | 'price';
  page?: number;
  limit?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_type: string;
  price_level: number;
  rating: number;
  delivery_time: number;
  delivery_fee: number;
  minimum_order: number;
  location: { lat: number; lon: number };
  image_url: string;
  menu_items: MenuItem[];
  opening_hours: OpeningHours;
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  allergens: string[];
  modifiers: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface OpeningHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchRestaurants(query: SearchQuery) {
    const must: any[] = [];
    const filter: any[] = [];
    const sort: any[] = [];

    // Text-Suche mit Boost für wichtige Felder
    if (query.text) {
      must.push({
        multi_match: {
          query: query.text,
          fields: [
            'name^3',
            'description^2',
            'cuisine_type^2',
            'menu_items.name^2',
            'menu_items.description'
          ],
          type: 'best_fields',
          fuzziness: 'AUTO'
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

    // Lieferzeit-Filter
    if (query.deliveryTime) {
      filter.push({
        range: { delivery_time: { lte: query.deliveryTime } }
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

      // Geo-Distance Sorting
      sort.push({
        _geo_distance: {
          location: {
            lat: query.location.lat,
            lon: query.location.lng
          },
          order: 'asc',
          unit: 'km'
        }
      });
    }

    // Sortierung
    switch (query.sortBy) {
      case 'rating':
        sort.unshift({ rating: { order: 'desc' } });
        break;
      case 'delivery_time':
        sort.unshift({ delivery_time: { order: 'asc' } });
        break;
      case 'price':
        sort.unshift({ price_level: { order: 'asc' } });
        break;
      default:
        sort.unshift({ _score: { order: 'desc' } });
    }

    const searchQuery = {
      index: 'restaurants',
      body: {
        query: {
          bool: { must, filter }
        },
        sort,
        from: ((query.page || 1) - 1) * (query.limit || 20),
        size: query.limit || 20,
        aggs: {
          cuisines: {
            terms: { 
              field: 'cuisine_type.keyword', 
              size: 50 
            }
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
          },
          avg_rating: {
            avg: { field: 'rating' }
          },
          avg_delivery_time: {
            avg: { field: 'delivery_time' }
          }
        }
      }
    };

    try {
      const response = await this.elasticsearchService.search(searchQuery);
      
      return {
        restaurants: response.body.hits.hits.map(hit => ({
          ...hit._source,
          score: hit._score,
          distance: hit.sort?.[1] // Geo-distance wenn verfügbar
        })),
        total: response.body.hits.total.value,
        page: query.page || 1,
        limit: query.limit || 20,
        aggregations: response.body.aggregations
      };
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      throw new Error('Suche fehlgeschlagen');
    }
  }

  async autocomplete(query: string, limit: number = 5) {
    const searchQuery = {
      index: 'restaurants',
      body: {
        suggest: {
          restaurant_suggest: {
            prefix: query,
            completion: {
              field: 'suggest',
              size: limit
            }
          }
        },
        _source: ['name', 'cuisine_type']
      }
    };

    try {
      const response = await this.elasticsearchService.search(searchQuery);
      return response.body.suggest.restaurant_suggest[0].options;
    } catch (error) {
      console.error('Autocomplete error:', error);
      return [];
    }
  }

  async indexRestaurant(restaurant: Restaurant) {
    try {
      // Suggest-Feld für Autocomplete hinzufügen
      const restaurantWithSuggest = {
        ...restaurant,
        suggest: {
          input: [
            restaurant.name,
            restaurant.cuisine_type,
            ...restaurant.menu_items.map(item => item.name)
          ]
        }
      };

      await this.elasticsearchService.index({
        index: 'restaurants',
        id: restaurant.id,
        body: restaurantWithSuggest
      });

      return { success: true };
    } catch (error) {
      console.error('Index restaurant error:', error);
      throw new Error('Restaurant konnte nicht indexiert werden');
    }
  }

  async updateRestaurant(id: string, updates: Partial<Restaurant>) {
    try {
      await this.elasticsearchService.update({
        index: 'restaurants',
        id,
        body: {
          doc: updates
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Update restaurant error:', error);
      throw new Error('Restaurant konnte nicht aktualisiert werden');
    }
  }

  async deleteRestaurant(id: string) {
    try {
      await this.elasticsearchService.delete({
        index: 'restaurants',
        id
      });

      return { success: true };
    } catch (error) {
      console.error('Delete restaurant error:', error);
      throw new Error('Restaurant konnte nicht gelöscht werden');
    }
  }

  async getPopularSearches(limit: number = 10) {
    // Implementierung für beliebte Suchbegriffe basierend auf Logs
    // Hier könnte man eine separate Index für Search-Logs verwenden
    return [
      'Pizza',
      'Sushi',
      'Burger',
      'Chinesisch',
      'Italienisch',
      'Indisch',
      'Mexikanisch',
      'Vegan',
      'Vegetarisch',
      'Schnell'
    ].slice(0, limit);
  }

  async getTrendingRestaurants(location?: { lat: number; lng: number }) {
    const filter: any[] = [];

    if (location) {
      filter.push({
        geo_distance: {
          distance: '10km',
          location: {
            lat: location.lat,
            lon: location.lng
          }
        }
      });
    }

    const searchQuery = {
      index: 'restaurants',
      body: {
        query: {
          bool: { filter }
        },
        sort: [
          { rating: { order: 'desc' } },
          { _score: { order: 'desc' } }
        ],
        size: 10
      }
    };

    try {
      const response = await this.elasticsearchService.search(searchQuery);
      return response.body.hits.hits.map(hit => hit._source);
    } catch (error) {
      console.error('Trending restaurants error:', error);
      return [];
    }
  }
}