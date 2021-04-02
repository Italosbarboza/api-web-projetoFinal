import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  senha: string;
  nome: string;
  idade: number;
  telefone: number;
  cpf: string;
  nivel_acesso: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, senha, nome, idade, telefone, cpf, nivel_acesso }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail already exists");
    }

    const passwordHash = await this.hashProvider.generateHash(senha);

    const user = await this.usersRepository.create({
      email, 
      senha: passwordHash, 
      nome, 
      idade, 
      telefone, 
      cpf,
      nivel_acesso
    });

    return user;
  }
}

export default CreateUserService;
