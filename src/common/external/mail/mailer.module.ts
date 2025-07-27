import { Module } from '@nestjs/common';
import { NodemailerService } from './mail.service';

@Module({
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class MailerModule {}
