import { MailgunClient } from "../../config/mailgun.js";

export default class EmailSendingService {
  private readonly mailgunClient: MailgunClient;

  constructor(mailgunClient: MailgunClient) {
    this.mailgunClient = mailgunClient;
  }

  async sendVerificationEmail(to: string, verificationLink: string): Promise<void> {
    const from = "Your Name <your_email@your_domain.com>";
    const subject = "Account Verification";
    const text = `Please click the following link to verify your account: ${verificationLink}`;
    await this.mailgunClient.sendEmail(to, from, subject, text);
  }

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    const from = "Your Name <your_email@your_domain.com>";
    const subject = "Password Reset";
    const text = `You have requested to reset your password. Please click the following link to reset your password: ${resetLink}`;
    await this.mailgunClient.sendEmail(to, from, subject, text);
  }

  async sendWelcomeEmail(to: string): Promise<void> {
    const from = "Your Name <your_email@your_domain.com>";
    const subject = "Welcome to Our Website!";
    const text = `Welcome to our website! We're excited to have you on board.`;
    await this.mailgunClient.sendEmail(to, from, subject, text);
  }
}
