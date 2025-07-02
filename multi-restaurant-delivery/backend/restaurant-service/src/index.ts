import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { RestaurantController } from './controllers/RestaurantController';
import { DataSource } from 'typeorm';
import { Restaurant } from './entities/Restaurant';

const AppDataSource = new DataSource({
  /* wie in Schritt 5 */
});

AppDataSource.initialize().then(() => {
  const app = createExpressServer({
    routePrefix: '/api',
    controllers: [RestaurantController],
    cors: true,
  });
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => console.log(`Restaurant-Service auf Port ${PORT}`));
});
