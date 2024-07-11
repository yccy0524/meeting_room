/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 15:36:35
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-10 16:00:01
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 1,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
