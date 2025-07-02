import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('tasks')
export class TaskProcessor {
  @Process({ name: 'email', concurrency: 5 })
  async handleEmail(job: Job) {
    // send email logic
    console.log('Sending email:', job.data);
  }
}
