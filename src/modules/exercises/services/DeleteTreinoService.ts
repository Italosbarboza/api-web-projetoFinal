import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';


@injectable()
class DeleteTreinoService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute(id_delete: string): Promise<string> {
    
    const treino = await this.treinoRepository.deleteTreino(id_delete);
    
    return id_delete;
  }
}

export default DeleteTreinoService;