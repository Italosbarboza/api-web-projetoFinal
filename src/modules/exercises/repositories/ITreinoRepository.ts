import ICreateTreinoDTO from "../dtos/ICreateTreinoDTO";
import Treino from "../infra/typeorm/entities/Treino";
import ICreateTreinoUsuarioDTO from '../dtos/ICreateTreinoUsuarioDTO';
import TreinoUsuario from "../infra/typeorm/entities/TreinoUsuario";

export default interface ITreinoRepository {
  create(treino: ICreateTreinoDTO): Promise<Treino>;
  index(id_professor: number): Promise<Treino[]>;
  indexTreinoDia(): Promise<Treino[]>;
  createTreinoUsuario(treino : TreinoUsuario): Promise<TreinoUsuario>;
  findTreinoDia(user_id: string, data_treino: string): Promise<[]>;
  deleteTreino(id_delete: string): Promise<void>;
  indexTreinoUsuario(): Promise<TreinoUsuario[]>;
  findTreinoDiaUsuario(id_usuario: string, data_cadastro: string): Promise<TreinoUsuario[]>;
  indexTreinoUsuarioAluno(user_id: number): Promise<TreinoUsuario[]>;
  indexTreinoUsuarioProfessor(user_id: number): Promise<TreinoUsuario[]>;

}
