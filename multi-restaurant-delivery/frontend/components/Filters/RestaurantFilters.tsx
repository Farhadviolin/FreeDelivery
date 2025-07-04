import React, { useState } from 'react';
import { FunnelIcon, StarIcon, ClockIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface FilterOptions {
  cuisine: string[];
  priceRange: [number, number];
  rating: number;
  deliveryTime: number;
  sortBy: 'relevance' | 'rating' | 'delivery_time' | 'price';
}

interface RestaurantFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  aggregations?: {
    cuisines: { key: string; doc_count: number }[];
    price_ranges: { key: string; doc_count: number }[];
    avg_rating: { value: number };
  };
}

const CUISINE_OPTIONS = [
  'Italienisch', 'Chinesisch', 'Indisch', 'Mexikanisch', 'Japanisch',
  'Griechisch', 'Türkisch', 'Amerikanisch', 'Französisch', 'Thai',
  'Vietnamesisch', 'Koreanisch', 'Deutsch', 'Vegetarisch', 'Vegan'
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevanz', icon: FunnelIcon },
  { value: 'rating', label: 'Bewertung', icon: StarIcon },
  { value: 'delivery_time', label: 'Lieferzeit', icon: ClockIcon },
  { value: 'price', label: 'Preis', icon: CurrencyEuroIcon }
];

export const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({
  filters,
  onFiltersChange,
  aggregations
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine];
    updateFilters({ cuisine: newCuisines });
  };

  const setPriceRange = (min: number, max: number) => {
    updateFilters({ priceRange: [min, max] });
  };

  const setRating = (rating: number) => {
    updateFilters({ rating: filters.rating === rating ? 0 : rating });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      cuisine: [],
      priceRange: [1, 5],
      rating: 0,
      deliveryTime: 60,
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = 
    filters.cuisine.length > 0 || 
    filters.rating > 0 || 
    filters.priceRange[0] > 1 || 
    filters.priceRange[1] < 5 ||
    filters.deliveryTime < 60;

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden px-4 py-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
        >
          <div className="flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter & Sortierung
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                Aktiv
              </span>
            )}
          </div>
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="px-4 py-4 space-y-6">
          
          {/* Sortierung */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sortieren nach</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateFilters({ sortBy: option.value as any })}
                  className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg border ${
                    filters.sortBy === option.value
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Küche */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Küche</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {CUISINE_OPTIONS.map(cuisine => {
                const count = aggregations?.cuisines.find(c => c.key === cuisine)?.doc_count;
                return (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisine(cuisine)}
                    disabled={count === 0}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border ${
                      filters.cuisine.includes(cuisine)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : count === 0
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cuisine}</span>
                    {count !== undefined && (
                      <span className="text-xs text-gray-500">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preis */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Preis</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPriceRange(1, 2)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border ${
                  filters.priceRange[0] === 1 && filters.priceRange[1] === 2
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                € (Günstig)
              </button>
              <button
                onClick={() => setPriceRange(2, 4)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border ${
                  filters.priceRange[0] === 2 && filters.priceRange[1] === 4
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                €€ (Mittel)
              </button>
              <button
                onClick={() => setPriceRange(4, 5)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border ${
                  filters.priceRange[0] === 4 && filters.priceRange[1] === 5
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                €€€ (Teuer)
              </button>
            </div>
          </div>

          {/* Bewertung */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Mindestbewertung</h3>
            <div className="flex space-x-2">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRating(rating)}
                  className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg border ${
                    filters.rating === rating
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                  <span className="ml-1">{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lieferzeit */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Max. Lieferzeit: {filters.deliveryTime} Min
            </h3>
            <input
              type="range"
              min={15}
              max={90}
              step={15}
              value={filters.deliveryTime}
              onChange={(e) => updateFilters({ deliveryTime: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 Min</span>
              <span>90 Min</span>
            </div>
          </div>

          {/* Filter zurücksetzen */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 
                           border border-red-200 rounded-lg hover:bg-red-100"
              >
                Alle Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};