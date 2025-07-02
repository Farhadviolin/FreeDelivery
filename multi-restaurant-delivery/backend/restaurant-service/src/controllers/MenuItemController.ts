import { JsonController, Get, Post, Put, Delete, Param, Body, HttpCode } from 'routing-controllers';
import { MenuItemService } from '../services/MenuItemService';
import { CreateMenuItemDto } from '../dtos/CreateMenuItemDto';

@JsonController('/menu-items')
export class MenuItemController {
  private svc = new MenuItemService();

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateMenuItemDto) {
    return this.svc.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateMenuItemDto) {
    return this.svc.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
