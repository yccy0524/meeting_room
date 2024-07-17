import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-16 22:26:33
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-16 22:30:54
 * @Description:
 */
export class UpdatePasswordDto {
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  password: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
