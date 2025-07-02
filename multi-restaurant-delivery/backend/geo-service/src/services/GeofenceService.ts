import { getRepository } from 'typeorm';
import { GeofenceZone } from '../entities/GeofenceZone';
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL!);

export class GeofenceService {
  static async createZone(dto: any) {
    const repo = getRepository(GeofenceZone);
    const zone = repo.create({ ...dto });
    await repo.save(zone);
    // Optional: Bounding Box/Center in Redis für schnelle Checks
    return zone;
  }

  static async getAllZones() {
    return getRepository(GeofenceZone).find();
  }

  static async getZonesForLocation(lat: number, lng: number) {
    return getRepository(GeofenceZone)
      .createQueryBuilder()
      .where('ST_Contains(area, ST_SetSRID(ST_MakePoint(:lng, :lat),4326))', { lat, lng })
      .getMany();
  }
}
