import { JsonController, Get, Post, Body } from 'routing-controllers';
import { GeofenceService } from '../services/GeofenceService';
import { CreateZoneDto } from '../dtos/CreateZoneDto';

@JsonController('/geofence')
export class GeofenceController {
  @Get('/zones')
  async listZones() {
    return GeofenceService.getAllZones();
  }

  @Post('/zones')
  async createZone(@Body() dto: CreateZoneDto) {
    return GeofenceService.createZone(dto);
  }
}
