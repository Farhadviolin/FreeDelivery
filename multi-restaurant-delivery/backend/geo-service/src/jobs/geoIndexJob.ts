import Redis from 'ioredis';
import { getRepository } from 'typeorm';
import { GeofenceZone } from '../entities/GeofenceZone';
import * as turf from '@turf/turf';
const redis = new Redis(process.env.REDIS_URL!);

export async function rebuildIndex() {
  const zones = await getRepository(GeofenceZone).find();
  for (const z of zones) {
    const center = turf.center(z.area).geometry.coordinates; // [lng,lat]
    await redis.geoadd('zones', center[0], center[1], z.id);
  }
}

rebuildIndex();
