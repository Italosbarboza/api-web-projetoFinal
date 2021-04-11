import { getRepository, Repository, getManager } from "typeorm";

import ICreateTreinoDTO from "@modules/exercises/dtos/ICreateTreinoDTO";

import ITreinoRepository from "@modules/exercises/repositories/ITreinoRepository";
import Treino from "../entities/Treino";


class TreinosRepository implements ITreinoRepository {
  private ormRepository: Repository<Treino>;
  private entityManager = getManager();


  constructor() {
    this.ormRepository = getRepository(Treino);
  }

  public async create(treino: ICreateTreinoDTO): Promise<Treino> {

    const treinoSalvo = await this.ormRepository.save(treino);

    return treinoSalvo;
  }

  public async index(id_professor: number): Promise<Treino[]> {
    const rawData = await this.entityManager.query(`
    select *, DATE_FORMAT(data_treino,'%d/%m/%Y') as data_treino from treino
    where id_professor = ${id_professor} ORDER BY data_treino DESC;
    `);

    return rawData;
  }

}

export default TreinosRepository;
