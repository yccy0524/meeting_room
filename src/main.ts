/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:37:39
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-16 21:49:00
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalInterceptors(new InvokeRecordInterceptor());
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
