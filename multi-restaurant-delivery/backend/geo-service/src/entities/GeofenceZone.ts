import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GeofenceZone {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326 }) area: any;
  @Column('jsonb', { nullable: true }) metadata?: any;
}
