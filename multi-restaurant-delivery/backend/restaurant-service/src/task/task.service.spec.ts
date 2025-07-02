import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { TaskService } from './task.service';

const mockQueue = {
  add: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getQueueToken('tasks'),
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should enqueue a job with correct options', async () => {
    const jobName = 'email';
    const jobData = { to: 'test@example.com' };
    const jobOpts = { priority: 1 };
    await service.scheduleTask(jobName, jobData, jobOpts);
    expect(mockQueue.add).toHaveBeenCalledWith(jobName, jobData, jobOpts);
  });
});
