import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";
//import UserLevel from "../infra/typeorm/entities/UserLevel";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  //findByUserLevel(bm_codigo: string): Promise<UserLevel | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  saveHashAndPassword(user: User): Promise<User>;
  savePassword(user: User): Promise<User>;
  findByHash(hash: string): Promise<User | undefined>;
  resetHashAndDateForgot(login: string): Promise<User | undefined>;
}
