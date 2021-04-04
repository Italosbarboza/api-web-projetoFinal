import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class IndexProfessorProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const user = await this.usersRepository.findAllProfessores();

    if (!user) {
      throw new AppError("User not found.");
    }

    return user;
  }
}

export default IndexProfessorProfileService;
