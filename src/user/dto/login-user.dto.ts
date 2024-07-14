/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-14 21:53:05
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-14 21:55:46
 * @Description
 */
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
