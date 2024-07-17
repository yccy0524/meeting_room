/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-16 21:40:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-16 21:53:55
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const userAgent = request.headers['user-agent'];
    const { ip, method, path } = request;

    this.logger.debug(
      `${method} ${path} ${ip} ${userAgent}: ${context.getClass().name} invoke...`,
    );

    this.logger.debug(
      `user: ${request.user?.userId}, ${request.user?.username}`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        this.logger.debug(
          `${method} ${path} ${ip} ${userAgent}: ${response.statusCode} ${Date.now() - now}ms`,
        );
        this.logger.debug(`Response ${JSON.stringify(res)}`);
      }),
    );
  }
}
