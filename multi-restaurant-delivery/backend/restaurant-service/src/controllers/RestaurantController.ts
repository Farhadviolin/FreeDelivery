import { JsonController, Get, Post, Put, Delete, Param, Body, HttpCode } from 'routing-controllers';
import { RestaurantService } from '../services/RestaurantService';
import { CreateRestaurantDto } from '../dtos/CreateRestaurantDto';

@JsonController('/restaurants')
export class RestaurantController {
  private svc = new RestaurantService();

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateRestaurantDto) {
    return this.svc.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateRestaurantDto) {
    return this.svc.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
