import { Injectable } from '@nestjs/common';
@Injectable()
export class GamifyService {
  async awardPoints(userId: string, metric: string) {
    const pts = await this.computePoints(metric);
    await this.keycloakAdmin.createUserAttribute({
      userId,
      name: 'sec_score',
      value: pts.toString(),
    });
    await this.slack.chat.postMessage({
      channel: `@${userId}`,
      text: `You earned ${pts} security points!`,
    });
  }
  async computePoints(metric: string) {
    // Beispiel: 10 Punkte pro resolved vulnerability
    if (metric === 'vuln_resolved') return 10;
    return 1;
  }
}
