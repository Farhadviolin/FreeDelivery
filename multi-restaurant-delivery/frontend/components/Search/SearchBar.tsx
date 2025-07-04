import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { searchService } from '../../services/search.service';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Nach Restaurants, Küche oder Gerichten suchen...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularSearches, setPopularSearches] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Lade beliebte Suchbegriffe
    searchService.getPopularSearches().then(setSuggestions);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);

    // Debounce Autocomplete
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length >= 2) {
      timeoutRef.current = setTimeout(async () => {
        try {
          const autocompleteResults = await searchService.autocomplete(value);
          setSuggestions(autocompleteResults);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Autocomplete error:', error);
        }
      }, 300);
    } else {
      setSuggestions(popularSearches);
      setShowSuggestions(value.length === 0);
    }
  };

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions(popularSearches);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     text-sm bg-white shadow-sm"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {query.length === 0 && (
            <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50">
              Beliebte Suchbegriffe
            </div>
          )}
          
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(typeof suggestion === 'string' ? suggestion : suggestion.text)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 
                         focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">
                  {typeof suggestion === 'string' ? suggestion : suggestion.text}
                </span>
                {typeof suggestion === 'object' && suggestion.type && (
                  <span className="ml-auto text-xs text-gray-500 capitalize">
                    {suggestion.type}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};