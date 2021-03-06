import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ITreinoRepository from '../repositories/ITreinoRepository';
import Treino from "../infra/typeorm/entities/Treino";
import moment from 'moment';

interface IRequest {
  user_id: string;
  aquecimento: string;
  tecnica: string;
  wood: string; 
}

@injectable()
class CreateTreinoService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  public async execute({ user_id, aquecimento, tecnica, wood  }: IRequest): Promise<Treino> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError("Usuário não existe");
    }
    
    const id_professor=  Number(user_id);

    const data_treino = moment().format('YYYY-MM-DD');

    const verificarTreino =  await this.treinoRepository.findTreinoDia(user_id, data_treino);

    if(verificarTreino.length != 0) {
      throw new AppError("Você já registrou seu treino diário. Para registrar um novo treino, exclua o anterior.");
    }
    
    const treino = await this.treinoRepository.create({
      data_treino, 
      aquecimento, 
      tecnica, 
      wood,
      id_professor,
    });
    
    console.log(treino)

    return treino;
  }
}

export default CreateTreinoService;
