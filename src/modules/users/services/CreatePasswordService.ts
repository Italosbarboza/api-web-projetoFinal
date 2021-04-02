import { injectable, inject } from "tsyringe";
import crypto from 'crypto';

import AppError from "@shared/errors/AppError";

import moment from 'moment';

// import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  hash: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ hash, password }: IRequest): Promise<void> {
    const userHash = await this.usersRepository.findByHash(hash);

    if (!userHash) {
      throw new AppError("Invalide Token", 498);
    }

    const dataTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');

    const diferenceHours = moment(dataTimeNow).diff(userHash.date_time_forgot_pswd, "minutes");

    if(diferenceHours > 240) {
      throw new AppError("Invalide Token", 498);
    }

    // Modularizar para dentro do módulo de Bcrytion
    const pswdMD5 = await crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    userHash.pswd = pswdMD5;

    await this.usersRepository.savePassword(userHash);

    await this.usersRepository.resetHashAndDateForgot(userHash.login);


  }
}

export default ResetPasswordService;
