import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import Treino from "../infra/typeorm/entities/Treino";


@injectable()
class IndexTreinoDiaService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute(): Promise<Treino[]> {
    
    const treino = await this.treinoRepository.indexTreinoDia();
    
    return treino;
  }
}

export default IndexTreinoDiaService;
