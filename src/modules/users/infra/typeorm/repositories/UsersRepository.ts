import { getRepository, Repository, Not } from "typeorm";

import IUsersRepository from "@modules//users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";

import User from "../entities/User";
//import UserLevel from "../entities/UserLevel";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  //private ormTemporaryRepository: Repository<UserLevel>;

  constructor() {
    this.ormRepository = getRepository(User);
    //this.ormTemporaryRepository = getRepository(UserLevel);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByHash(hash: string): Promise<User | undefined> {
    const hash_forgot_pswd = hash;
    const user = await this.ormRepository.findOne({ where: { hash_forgot_pswd } });

    return user;
  }


  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findByLogin(login: string): Promise<User | undefined> {

    const user = await this.ormRepository.findOne({
      where: { login }
    });

    return user;
  }

  /*public async findByUserLevel(bm_codigo: string): Promise<UserLevel | undefined> {

    const userLevel = await this.ormTemporaryRepository.findOne({
      where: { bm_codigo }
    });

    return userLevel;
  }*/

  public async findAllAlunos(): Promise<User[]> {

    const users = await this.ormRepository.find({where: {nivel_acesso: 3}});


    return users;
  }

  public async findAllProfessores(): Promise<User[]> {

    const users = await this.ormRepository.find({where: {nivel_acesso: 2}});


    return users;
  }

  public async deleteAluno(alunoDelete: User): Promise<void> {
    await this.ormRepository.remove(alunoDelete);
  }


  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async saveHashAndPassword(user: User): Promise<User> {
    const userFind = await this.ormRepository.findOne(user.login);

    if(userFind) {}

    // Create query builder because of the relation ManyToMany
    await this.ormRepository.createQueryBuilder()
          .update().set({ hash_forgot_pswd: user.hash_forgot_pswd, date_time_forgot_pswd: user.date_time_forgot_pswd }).where("login = :login", { login: userFind?.login }).execute();

    return user;
  }

  public async savePassword(user: User): Promise<User> {
    const userSave = await this.ormRepository.save(user);

    return userSave;
  }

  public async save(user: User): Promise<User> {
    const userSave = await this.ormRepository.save(user);

    return userSave;
  }

  public async resetHashAndDateForgot(login: string): Promise<User | undefined> {
    const userFind = await this.ormRepository.findOne(login);

    if(userFind) {}

    const loginUser = userFind?.login;

    // Create query builder because of the relation ManyToMany
    await this.ormRepository.createQueryBuilder()
          .update().set({ hash_forgot_pswd: '', date_time_forgot_pswd: '' }).where("login = :login", { login: loginUser }).execute();

    return userFind;
  }
}

export default UsersRepository;
