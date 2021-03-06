import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';
@Injectable()
export class AppService {
  constructor(
    /* private configService: ConfigService,  */
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[]
  ) {}
  
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;
    const enviroment = this.configService.enviroment;

    console.log(apiKey, this.tasks);
    return `
    <h2>Hello World!</h2>
    <p><b>The API key is:</b> ${apiKey}</p>
    <p><b>The DataBase name is:</b> ${dbName}</p>
    <p><b>The DB Port is:</b> ${dbPort}</p>
    <p><b>The Enviroment is:</b> ${enviroment}</p>
    `;
  }
}
