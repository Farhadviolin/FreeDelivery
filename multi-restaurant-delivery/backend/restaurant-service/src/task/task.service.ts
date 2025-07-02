import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, JobsOptions } from 'bullmq';

@Injectable()
export class TaskService {
  constructor(@InjectQueue('tasks') private queue: Queue) {}

  async scheduleTask(name: string, data: any, opts?: JobsOptions) {
    return this.queue.add(name, data, opts);
  }
}
