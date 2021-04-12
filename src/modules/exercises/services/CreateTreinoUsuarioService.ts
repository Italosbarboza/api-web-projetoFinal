import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import Treino from "../infra/typeorm/entities/Treino";
import moment from 'moment';
import ICreateTreinoUsuarioDTO from '../dtos/ICreateTreinoUsuarioDTO';
import TreinoUsuario from "../infra/typeorm/entities/TreinoUsuario";

@injectable()
class CreateTreinoUsuarioService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute({ id_usuario, id_treino, quilocalorias_queimadas, batimento_cardiaco, massa_muscular, porcentagem_gordura  }: ICreateTreinoUsuarioDTO): Promise<TreinoUsuario> {
    
    const user_id = String(id_usuario);

    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError("Usuário não existe");
    }
    
    const treino = await this.treinoRepository.createTreinoUsuario({
        id_usuario, 
        id_treino,
        quilocalorias_queimadas, 
        batimento_cardiaco,
        massa_muscular,
        porcentagem_gordura
    });

    return treino;
  }
}

export default CreateTreinoUsuarioService;
