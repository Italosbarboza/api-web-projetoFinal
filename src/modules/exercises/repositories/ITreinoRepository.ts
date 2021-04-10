import ICreateTreinoDTO from "../dtos/ICreateTreinoDTO";
import Treino from "../infra/typeorm/entities/Treino";


export default interface ITreinoRepository {
  create(treino: ICreateTreinoDTO): Promise<Treino>;
  index(id_professor: number): Promise<Treino[]>;
}
