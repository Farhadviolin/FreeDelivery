import { Controller, Post, Body } from '@nestjs/common';
import { WorkflowClient } from './workflow.client';
import { DSARRequestDto } from './dsar.dto';

@Controller()
export class DSARController {
  constructor(private workflowClient: WorkflowClient) {}
  @Post('dsar')
  async requestDSAR(@Body() dto: DSARRequestDto) {
    return this.workflowClient.createInstance({ bpmnProcessId: 'DSARProcess', variables: dto });
  }
}
