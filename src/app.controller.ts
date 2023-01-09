import { Controller, Get, Param, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicRequest } from './auth/decorators/public-request.decorator';
import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @PublicRequest()
  @Get('new')
  newEndPoint() {
    return 'NUEVO ENDPOINT';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
