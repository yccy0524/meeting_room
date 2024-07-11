/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:49:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-10 16:06:50
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    console.log('registerUser---', registerUser);
    return await this.userService.register(registerUser);
  }
}
