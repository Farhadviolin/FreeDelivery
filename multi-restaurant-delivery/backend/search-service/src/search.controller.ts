import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { SearchService, SearchQuery, Restaurant } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('restaurants')
  async searchRestaurants(
    @Query('q') text?: string,
    @Query('cuisine') cuisine?: string,
    @Query('priceMin') priceMin?: number,
    @Query('priceMax') priceMax?: number,
    @Query('rating') rating?: number,
    @Query('deliveryTime') deliveryTime?: number,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radius') radius?: number,
    @Query('sortBy') sortBy?: 'relevance' | 'rating' | 'delivery_time' | 'price',
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const query: SearchQuery = {
      text,
      cuisine: cuisine ? cuisine.split(',') : undefined,
      priceRange: priceMin && priceMax ? [priceMin, priceMax] : undefined,
      rating,
      deliveryTime,
      location: lat && lng ? { lat, lng, radius: radius || 5 } : undefined,
      sortBy: sortBy || 'relevance',
      page: page || 1,
      limit: limit || 20
    };

    return await this.searchService.searchRestaurants(query);
  }

  @Get('autocomplete')
  async autocomplete(
    @Query('q') query: string,
    @Query('limit') limit?: number
  ) {
    return await this.searchService.autocomplete(query, limit);
  }

  @Get('popular')
  async getPopularSearches(@Query('limit') limit?: number) {
    return await this.searchService.getPopularSearches(limit);
  }

  @Get('trending')
  async getTrendingRestaurants(
    @Query('lat') lat?: number,
    @Query('lng') lng?: number
  ) {
    const location = lat && lng ? { lat, lng } : undefined;
    return await this.searchService.getTrendingRestaurants(location);
  }

  @Post('restaurants')
  async indexRestaurant(@Body() restaurant: Restaurant) {
    return await this.searchService.indexRestaurant(restaurant);
  }

  @Post('restaurants/:id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updates: Partial<Restaurant>
  ) {
    return await this.searchService.updateRestaurant(id, updates);
  }
}