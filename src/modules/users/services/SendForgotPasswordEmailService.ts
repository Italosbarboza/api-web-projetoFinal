import { injectable, inject } from "tsyringe";
import path from "path";

import AppError from "@shared/errors/AppError";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  cpf: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

  ) {}

  public async execute({ email, cpf }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.", 400);
    }

    if(user.cpf !== cpf) {
      throw new AppError("User does not exists.", 400);
    }

    const new_passowrd = Math.random().toString(36).slice(-8);
    
    const passwordHash = await this.hashProvider.generateHash(new_passowrd);

    user.senha = passwordHash;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.nome,
        email: user.email,
      },
      subject: "[Crossfit] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.nome,
          senha: new_passowrd,
        },
      },
    });

    await this.usersRepository.savePassword(user);

    return user.email;
  }
}


export default SendForgotPasswordEmailService;
