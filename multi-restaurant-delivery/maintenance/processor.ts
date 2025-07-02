import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('maintenance-schedule')
export class MaintenanceProcessor {
  @Process('notify_driver')
  async notify(job: Job<{vehicle_id:string, datetime:string}>) {
    // Push-In-App Notification zur Fahrer-App
  }
}
