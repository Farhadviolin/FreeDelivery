import { DataSource } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';

const AppDataSource = new DataSource({
  /* wie in Schritt 5 */
});

export class RestaurantService {
  private repo = AppDataSource.getRepository(Restaurant);

  findAll() {
    return this.repo.find();
  }
  findOne(id: string) {
    return this.repo.findOneByOrFail({ id });
  }
  create(data: Partial<Restaurant>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }
  update(id: string, data: Partial<Restaurant>) {
    return this.repo.update(id, data);
  }
  remove(id: string) {
    return this.repo.delete(id);
  }
}
