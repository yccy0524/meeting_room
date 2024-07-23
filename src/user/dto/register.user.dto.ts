import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 10:47:13
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-23 15:38:53
 * @Description:
 */
export class RegisterUserDto {
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

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @ApiProperty()
  captcha: string;

  @IsNotEmpty({
    message: '昵称不能为空',
  })
  @ApiProperty()
  nickName: string;
}
