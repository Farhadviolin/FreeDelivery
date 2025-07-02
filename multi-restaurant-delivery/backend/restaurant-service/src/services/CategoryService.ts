import { DataSource } from 'typeorm';
import { Category } from '../entities/Category';

const AppDataSource = new DataSource({
  /* ... */
});

export class CategoryService {
  private repo = AppDataSource.getRepository(Category);

  findAll() {
    return this.repo.find({ relations: ['items'] });
  }
  create(data: Partial<Category>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }
  update(id: string, data: Partial<Category>) {
    return this.repo.update(id, data);
  }
  remove(id: string) {
    return this.repo.delete(id);
  }
}
