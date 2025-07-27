import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeMailerProvider } from '@common/enum';

export interface MailRequest {
  sender: string;
  receiver: string;
  subject: string;
  content: string;
  attachment?: {
    data: any;
    filename: string;
    contentType: string;
  };
  from?: string;
}

export interface MailResponse {
  message: string;
  id: string;
}

export interface MailService {
  sendEmail(request: MailRequest): Promise<MailResponse>;
}

@Injectable()
export class MailgunService implements MailService {
  constructor(private _config: ConfigService) {}

  private readonly mailGun = this._config.get('app.mailGun');

  private mg = new Mailgun(FormData).client({
    username: 'api',
    key: this.mailGun.apiKey,
  });

  private MAIL_DOMAIN = this.mailGun.host;

  async sendEmail(request: MailRequest): Promise<MailResponse> {
    const { sender: from, receiver: to, subject, content: html } = request;
    const messageData: any = { from, to, subject, html };

    if (request.attachment) {
      const { data, filename, contentType } = request.attachment;
      messageData.attachment = [{ data, filename, contentType }];
    }

    try {
      const result = await this.mg.messages.create(
        this.MAIL_DOMAIN,
        messageData,
      );
      return {
        message: result.message,
        id: result.id,
      };
    } catch (error) {
      throw new Error(`Mailgun send email failed: ${error.message}`);
    }
  }
}

@Injectable()
export class NodemailerService implements MailService {
  constructor(private _config: ConfigService) {}

  private readonly gmail = this._config.get('app.gmail');

  private transporter = nodemailer.createTransport({
    service: NodeMailerProvider.GMAIL,
    auth: {
      user: this.gmail.user,
      pass: this.gmail.pass,
    },
  });

  async sendEmail(request: MailRequest): Promise<MailResponse> {
    const {
      sender: from,
      receiver: to,
      subject,
      content: html,
      attachment,
    } = request;
    const messageData: any = { from, to, subject, html };

    if (attachment) {
      messageData.attachments = [
        {
          filename: attachment.filename,
          content: attachment.data,
          contentType: attachment.contentType,
        },
      ];
    }

    try {
      const info = await this.transporter.sendMail(messageData);
      return {
        message: info.response,
        id: info.messageId,
      };
    } catch (error) {
      throw new Error(`Nodemailer send email failed: ${error.message}`);
    }
  }
}
