/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:49:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-13 22:40:57
 * @Description:
 */
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  redisService: RedisService;

  @Inject(EmailService)
  emailService: EmailService;

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    console.log('registerUser---', registerUser);
    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendEmail({
      to: address,
      subject: '注册验证码',
      html: `验证码：${code}`,
    });

    return '发送成功';
  }
}
