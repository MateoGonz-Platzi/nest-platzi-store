import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApikeyGuard } from './auth/guards/apikey.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApikeyGuard)
  @Get('new')
  newEndPoint() {
    return 'NUEVO ENDPOINT';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
