/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-16 21:29:09
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-16 21:32:16
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          message: 'success',
          data,
          code: 0,
        };
      }),
    );
  }
}
