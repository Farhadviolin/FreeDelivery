import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TaskService } from './task.service';
import { TaskProcessor } from './task.processor';
import { TaskController } from './task.controller';

@Module({
  imports: [
    BullModule.forRoot({ redis: { host: 'redis', port: 6379 } }),
    BullModule.registerQueue({ name: 'tasks' }),
  ],
  providers: [TaskService, TaskProcessor],
  controllers: [TaskController],
})
export class TaskModule {}
