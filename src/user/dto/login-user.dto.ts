/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-14 21:53:05
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-23 16:01:35
 * @Description
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @ApiProperty({
    minLength: 6,
  })
  password: string;
}
