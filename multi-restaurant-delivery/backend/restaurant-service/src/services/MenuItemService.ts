import { DataSource } from 'typeorm';
import { MenuItem } from '../entities/MenuItem';
import { Category } from '../entities/Category';

const AppDataSource = new DataSource({
  /* ... */
});

export class MenuItemService {
  private repo = AppDataSource.getRepository(MenuItem);
  private catRepo = AppDataSource.getRepository(Category);

  findAll() {
    return this.repo.find({ relations: ['category'] });
  }
  async create(data: any) {
    const category = await this.catRepo.findOneByOrFail({ id: data.categoryId });
    const ent = this.repo.create({ ...data, category });
    return this.repo.save(ent);
  }
  update(id: string, data: any) {
    return this.repo.update(id, data);
  }
  remove(id: string) {
    return this.repo.delete(id);
  }
}
