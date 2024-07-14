/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 15:36:35
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-14 21:17:21
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        console.log(
          'host---',
          configService.get('redis_server_host'),
          configService.get('redis_server_port'),
        );
        const client = createClient({
          socket: {
            host: configService.get('redis_server_host'),
            port: configService.get('redis_server_port'),
          },
          database: configService.get('redis_server_db'),
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
