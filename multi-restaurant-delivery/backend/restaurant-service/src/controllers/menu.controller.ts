import { Controller, Get, Param } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  @Get(':id')
  getDish(@Param('id') id: string) {
    return { id, name: 'Margherita', modelUrl: `https://assets.delivery.com/assets/${id}.glb` };
  }
}
