import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class ReferralService {
  async generateCode(userId: string): Promise<string> {
    const code = crypto.randomBytes(4).toString('hex');
    await this.repo.insert({ userId, code, created: new Date() });
    return code;
  }
  async applyCode(code: string, newUserId: string) {
    const ref = await this.repo.findOneBy({ code });
    await this.pointsService.addPoints(ref.userId, 100);
    await this.pointsService.addPoints(newUserId, 50);
  }
}
