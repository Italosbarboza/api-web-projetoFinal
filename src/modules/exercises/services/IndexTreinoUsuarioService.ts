import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import TreinoUsuario from "../infra/typeorm/entities/TreinoUsuario";


@injectable()
class IndexTreinoUsuarioService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute(): Promise<TreinoUsuario[]> {
    
    const treinoUsuario = await this.treinoRepository.indexTreinoUsuario();
    
    return treinoUsuario;
  }
}

export default IndexTreinoUsuarioService;