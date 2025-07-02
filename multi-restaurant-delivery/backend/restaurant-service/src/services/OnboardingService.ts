import { DataSource } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';
import { OnboardDto } from '../dtos/OnboardDto';

const AppDataSource = new DataSource(/* ... */);

export class OnboardingService {
  private repo = AppDataSource.getRepository(Restaurant);

  async startOnboarding(dto: OnboardDto) {
    const rest = this.repo.create({ ...dto, status: 'IN_REVIEW' });
    return this.repo.save(rest);
  }
}
