import Mailgun from "mailgun-js";


const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});


export class MailgunClient {

  async sendEmail(to: string, from: string, subject: string, text: string): Promise<void> {
    const data = { from, to, subject, text };
    try {
      await mailgun.messages().send(data);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

const mailgunClient = new MailgunClient();
export default mailgunClient;