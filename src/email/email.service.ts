import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: '404174228@qq.com',
        pass: 'uwqyjmqzdraecbcb',
      },
    });
  }

  async sendEmail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        address: '404174228@qq.com',
        name: '会议室预定系统',
      },
      to,
      subject,
      html,
    });
  }
}
