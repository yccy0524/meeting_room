/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 16:26:13
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-14 21:38:00
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('nodemailer_host'),
      port: this.configService.get('nodemailer_port'),
      secure: false,
      auth: {
        user: this.configService.get('nodemailer_auth_user'),
        pass: this.configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendEmail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        address: this.configService.get('nodemailer_auth_user'),
        name: '会议室预定系统',
      },
      to,
      subject,
      html,
    });
  }
}
