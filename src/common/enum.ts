export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  USER = 'user', // normal user
}

export enum MailProvider {
  MAILGUN = 'MailgunService',
  NODEMAILER = 'NodemailerService',
}

export enum NodeMailerProvider {
  GMAIL = 'gmail',
}
