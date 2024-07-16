/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:37:39
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-16 18:01:01
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermissions } from './decorator/custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @RequireLogin()
  @RequirePermissions('ccc')
  getHello1(): string {
    return this.appService.getHello();
  }
}
