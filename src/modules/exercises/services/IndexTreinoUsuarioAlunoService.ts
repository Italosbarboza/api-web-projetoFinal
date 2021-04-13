import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import TreinoUsuario from "../infra/typeorm/entities/TreinoUsuario";


@injectable()
class IndexTreinoUsuarioAlunoService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute(user_id: number): Promise<TreinoUsuario[]> {
    
    const treinoUsuario = await this.treinoRepository.indexTreinoUsuarioAluno(user_id);
    
    return treinoUsuario;
  }
}

export default IndexTreinoUsuarioAlunoService;