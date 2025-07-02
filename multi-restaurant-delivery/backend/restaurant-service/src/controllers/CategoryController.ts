import { JsonController, Get, Post, Put, Delete, Param, Body, HttpCode } from 'routing-controllers';
import { CategoryService } from '../services/CategoryService';
import { CreateCategoryDto } from '../dtos/CreateCategoryDto';

@JsonController('/categories')
export class CategoryController {
  private svc = new CategoryService();

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateCategoryDto) {
    return this.svc.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
    return this.svc.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
