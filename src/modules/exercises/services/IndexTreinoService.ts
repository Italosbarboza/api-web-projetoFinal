import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import Treino from "../infra/typeorm/entities/Treino";


@injectable()
class IndexTreinoService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute( user_id: string): Promise<Treino[ ]> {
    
    const id_professor=  Number(user_id);

    const treino = await this.treinoRepository.index(id_professor);
    
    return treino;
  }
}

export default IndexTreinoService;
