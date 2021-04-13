import { getRepository, Repository, getManager } from "typeorm";

import ICreateTreinoDTO from "@modules/exercises/dtos/ICreateTreinoDTO";

import ITreinoRepository from "@modules/exercises/repositories/ITreinoRepository";
import Treino from "../entities/Treino";
import TreinoUsuario from "../entities/TreinoUsuario";
import moment from 'moment';
import ICreateTreinoUsuarioDTO from '../../../dtos/ICreateTreinoUsuarioDTO';

class TreinosRepository implements ITreinoRepository {
  private ormRepository: Repository<Treino>;
  private ormRepositoryTU: Repository<TreinoUsuario>;
  private entityManager = getManager();


  constructor() {
    this.ormRepository = getRepository(Treino);
    this.ormRepositoryTU = getRepository(TreinoUsuario);
  }

  public async create(treino: ICreateTreinoDTO): Promise<Treino> {

    const treinoSalvo = await this.ormRepository.save(treino);

    return treinoSalvo;
  }

  public async createTreinoUsuario(treino : TreinoUsuario): Promise<TreinoUsuario> {
    
      const treinoSalvo = await this.ormRepositoryTU.save(treino);

      return treinoSalvo;
  }

  public async index(id_professor: number): Promise<Treino[]> {
    const rawData = await this.entityManager.query(`
    select *, DATE_FORMAT(data_treino,'%d/%m/%Y') as data_treino from treino
    where id_professor = ${id_professor} ORDER BY data_treino DESC;
    `);

    return rawData;
  }

  public async indexTreinoUsuario(): Promise<TreinoUsuario[]> {
    const rawData = await this.entityManager.query(`
    select *, DATE_FORMAT(data_cadastro,'%d/%m/%Y') as data_treino from usuariotreino;
    `);

    return rawData;
  }

  public async indexTreinoDia(): Promise<Treino[]> {
    const data_treino = moment().format('YYYY-MM-DD');
    console.log(data_treino)
    const rawData = await this.entityManager.query(`
    select t.id, t.aquecimento, t.tecnica, t.wood, u.nome as professor, 
    DATE_FORMAT(t.data_treino,'%d/%m/%Y') as data_treino from treino as t left join usuario as u on u.id = t.id_professor
    where DATE_FORMAT(t.data_treino, '%Y-%m-%d') = '${data_treino}';
    `);

    return rawData;
  }

  public async findTreinoDia(user_id: string, data_treino: string): Promise<[]> {
    const rawData = await this.entityManager.query(`
    select *, 
    DATE_FORMAT(t.data_treino,'%d/%m/%Y') as data_treino from treino as t
    where DATE_FORMAT(t.data_treino, '%Y-%m-%d') = '${data_treino}' AND id_professor = ${user_id};
    `);

    return rawData;
  }

  public async findTreinoDiaUsuario(id_usuario: string, data_cadastro: string): Promise<TreinoUsuario[]> {
    const rawData = await this.entityManager.query(`
    select *, 
    DATE_FORMAT(t.data_cadastro,'%d/%m/%Y') as data_cadastro from usuariotreino as t
    where DATE_FORMAT(t.data_cadastro, '%Y-%m-%d') = '${data_cadastro}' AND id_usuario = ${id_usuario};
    `);

    return rawData;
  }

  public async indexTreinoUsuarioAluno(user_id: number): Promise<TreinoUsuario[]> {
    const rawData = await this.entityManager.query(`
    select *, 
    DATE_FORMAT(t.data_cadastro,'%d/%m/%Y') as data_cadastro from usuariotreino as t
    where id_usuario = ${user_id};
    `);

    return rawData;
  }

  public async indexTreinoUsuarioProfessor(user_id: number): Promise<TreinoUsuario[]> {
    const rawData = await this.entityManager.query(`
    select *, 
    DATE_FORMAT(t.data_cadastro,'%d/%m/%Y') as data_cadastro from usuariotreino as t
    where id_professor = ${user_id};
    `);

    return rawData;
  }



  public async deleteTreino(id_delete: string): Promise<void> {
    await this.entityManager.query(`
    DELETE FROM treino WHERE id = ${id_delete};
    `);

  }  
}

export default TreinosRepository;
