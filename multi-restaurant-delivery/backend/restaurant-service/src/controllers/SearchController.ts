import { JsonController, Get, QueryParam } from 'routing-controllers';
import { AppDataSource } from '../data-source';
import { Restaurant } from '../entities/Restaurant';

@JsonController('/search')
export class SearchController {
  private repo = AppDataSource.getRepository(Restaurant);

  @Get()
  search(
    @QueryParam('q') q: string,
    @QueryParam('category') cat?: string,
    @QueryParam('minPrice') min?: number,
    @QueryParam('maxPrice') max?: number,
    @QueryParam('page') page = 1,
    @QueryParam('limit') limit = 20,
  ) {
    const qb = this.repo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.items', 'i')
      .where(`to_tsvector(r.name) @@ plainto_tsquery(:q)`, { q })
      .andWhere(cat ? 'i.categoryId = :cat' : '1=1', { cat })
      .andWhere(min != null ? 'i.price >= :min' : '1=1', { min })
      .andWhere(max != null ? 'i.price <= :max' : '1=1', { max })
      .skip((page - 1) * limit)
      .take(limit);

    return qb.getMany();
  }
}
