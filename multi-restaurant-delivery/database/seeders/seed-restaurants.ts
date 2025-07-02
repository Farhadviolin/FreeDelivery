// Beispielhafter Seeder für Restaurants
import { DataSource } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';
import ormconfig from '../ormconfig';

const seed = async () => {
  const ds = await ormconfig.initialize();
  const repo = ds.getRepository(Restaurant);
  await repo.save([
    { name: 'Pizza Palace', address: 'Hauptstr. 1', categories: ['Pizza', 'Italienisch'] },
    { name: 'Sushi World', address: 'Nebenstr. 2', categories: ['Sushi', 'Japanisch'] },
  ]);
  await ds.destroy();
  console.log('Restaurants seeded!');
};

seed();
