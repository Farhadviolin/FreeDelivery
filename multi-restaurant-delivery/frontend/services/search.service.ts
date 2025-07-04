import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface SearchQuery {
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

interface Restaurant {
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
  score?: number;
  distance?: number;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  allergens: string[];
  modifiers: Modifier[];
}

interface Modifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: ModifierOption[];
}

interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

interface OpeningHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

interface SearchResult {
  restaurants: Restaurant[];
  total: number;
  page: number;
  limit: number;
  aggregations: {
    cuisines: { key: string; doc_count: number }[];
    price_ranges: { key: string; doc_count: number }[];
    avg_rating: { value: number };
    avg_delivery_time: { value: number };
  };
}

class SearchService {
  private apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
  });

  constructor() {
    // Request Interceptor für Auth-Token
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response Interceptor für Error Handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  async searchRestaurants(query: SearchQuery): Promise<SearchResult> {
    const params = new URLSearchParams();

    if (query.text) params.append('q', query.text);
    if (query.cuisine?.length) params.append('cuisine', query.cuisine.join(','));
    if (query.priceRange) {
      params.append('priceMin', query.priceRange[0].toString());
      params.append('priceMax', query.priceRange[1].toString());
    }
    if (query.rating) params.append('rating', query.rating.toString());
    if (query.deliveryTime) params.append('deliveryTime', query.deliveryTime.toString());
    if (query.location) {
      params.append('lat', query.location.lat.toString());
      params.append('lng', query.location.lng.toString());
      params.append('radius', (query.location.radius || 5).toString());
    }
    if (query.sortBy) params.append('sortBy', query.sortBy);
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());

    const response = await this.apiClient.get(`/search/restaurants?${params.toString()}`);
    return response.data;
  }

  async autocomplete(query: string, limit: number = 5): Promise<string[]> {
    const response = await this.apiClient.get('/search/autocomplete', {
      params: { q: query, limit }
    });
    return response.data;
  }

  async getPopularSearches(limit: number = 10): Promise<string[]> {
    const response = await this.apiClient.get('/search/popular', {
      params: { limit }
    });
    return response.data;
  }

  async getTrendingRestaurants(location?: { lat: number; lng: number }): Promise<Restaurant[]> {
    const params = location ? { lat: location.lat, lng: location.lng } : {};
    const response = await this.apiClient.get('/search/trending', { params });
    return response.data;
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    const response = await this.apiClient.get(`/restaurants/${id}`);
    return response.data;
  }

  async getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
    const response = await this.apiClient.get(`/menus/${restaurantId}`);
    return response.data;
  }

  // Location Services
  async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 Minuten Cache
        }
      );
    });
  }

  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      // Hier würde normalerweise ein Geocoding-Service wie Google Maps verwendet
      // Für Demo-Zwecke geben wir eine statische Adresse zurück
      return `Beispielstraße 123, 1010 Wien`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  // Cache Management
  private cacheKey(query: SearchQuery): string {
    return btoa(JSON.stringify(query));
  }

  private getCachedResult(query: SearchQuery): SearchResult | null {
    const key = this.cacheKey(query);
    const cached = sessionStorage.getItem(`search_${key}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache für 5 Minuten gültig
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return data;
      }
    }
    return null;
  }

  private setCachedResult(query: SearchQuery, result: SearchResult): void {
    const key = this.cacheKey(query);
    sessionStorage.setItem(`search_${key}`, JSON.stringify({
      data: result,
      timestamp: Date.now()
    }));
  }

  async searchWithCache(query: SearchQuery): Promise<SearchResult> {
    const cached = this.getCachedResult(query);
    if (cached) {
      return cached;
    }

    const result = await this.searchRestaurants(query);
    this.setCachedResult(query, result);
    return result;
  }

  // Search History
  getSearchHistory(): string[] {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  }

  addToSearchHistory(query: string): void {
    if (!query.trim()) return;

    let history = this.getSearchHistory();
    history = history.filter(h => h !== query); // Remove duplicate
    history.unshift(query); // Add to beginning
    history = history.slice(0, 10); // Keep only last 10

    localStorage.setItem('searchHistory', JSON.stringify(history));
  }

  clearSearchHistory(): void {
    localStorage.removeItem('searchHistory');
  }
}

export const searchService = new SearchService();
export type { Restaurant, MenuItem, Modifier, SearchQuery, SearchResult };