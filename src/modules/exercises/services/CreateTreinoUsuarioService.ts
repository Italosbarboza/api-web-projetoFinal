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

    const data_cadastro = moment().format('YYYY-MM-DD');

    const findTreino = await this.treinoRepository.findTreinoDiaUsuario(user_id, data_cadastro);

    if(findTreino.length != 0) {
      throw new AppError("Você já registrou seu treino. Caso tenha confundido, apague o anterior e cadastre o novo treino");
    }
    
    const treino = await this.treinoRepository.createTreinoUsuario({
        id_usuario, 
        id_treino,
        quilocalorias_queimadas, 
        batimento_cardiaco,
        massa_muscular,
        porcentagem_gordura,
        data_cadastro
    });

    return treino;
  }
}

export default CreateTreinoUsuarioService;
