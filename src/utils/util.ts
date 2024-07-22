/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 15:50:22
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-22 22:31:57
 * @Description:
 */
import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import * as crypto from 'crypto';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function generateParseIntPipe(name) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(name + '应该为数据组');
    },
  });
}
