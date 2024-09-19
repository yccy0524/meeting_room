/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:37:39
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-24 21:40:10
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { CustomExceptionFilter } from './custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalInterceptors(new InvokeRecordInterceptor());

  const config = new DocumentBuilder()
    .setTitle('会议室预定系统')
    .setVersion('1.0')
    .setDescription('api 接口文档')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-doc', app, document);
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
