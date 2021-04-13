import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    id_update: string;
    nome: string;
    email: string;
    idade: number;
    telefone: number;
    cpf: string;
    senha: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
      id_update,
      nome,
      email,
      idade,
      telefone,
      cpf,
      senha,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_update);
    if (!user) {
      throw new AppError("User not found.");
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    console.log(userWithUpdatedEmail);

    if (userWithUpdatedEmail && userWithUpdatedEmail.email === email) {
      throw new AppError("E-mail already in use.");
    }

    if(nome) {
      user.nome = nome;
    }

    if(email) {
      user.email = email;
    }

    if(idade) {
      user.idade = idade;
    }

    if(telefone) {
      user.telefone = telefone;
    }

    if(cpf) {
      user.cpf = cpf;
    }

    if(senha) {
      user.senha = await this.hashProvider.generateHash(senha);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
