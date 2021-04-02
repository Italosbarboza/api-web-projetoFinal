import nodemailer, { createTestAccount, Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";

import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import { createBigIntLiteral } from "typescript";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'crossfitdsw@gmail.com',
          pass: 'dsw123456'
        },
        tls: {
          rejectUnauthorized: false,
        }
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: "CROSSFIT",
        address: "crossfitdsw@gmail.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
