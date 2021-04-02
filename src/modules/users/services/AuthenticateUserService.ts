import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: User;
  token: string;
  //temporaryUserLevel: UserLevel;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário ou senha incorreta.", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      senha,
      user.senha,
    );

    if (!passwordMatched) {
      throw new AppError("Usuário ou senha incorreta.", 401);
    }

    /*
    const temporaryUserLevel = await this.usersRepository.findByUserLevel(email);

    if (!temporaryUserLevel) {
      throw new AppError("Usuário não tem acesso a nenhum sistema.", 401);
    }
    */

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
