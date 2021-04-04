import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  user_id: string;
  id_delete: string;
}

@injectable()
class DeleteProfessorService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, id_delete }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(user && user.nivel_acesso === 1) {

        const alunoDelete = await this.usersRepository.findById(id_delete);

        if(alunoDelete && alunoDelete.nivel_acesso === 2) {
          this.usersRepository.deleteAluno(alunoDelete);
        }
    }
  
}
}

export default DeleteProfessorService;