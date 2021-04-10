import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import Groups from "./Groups";
import Treino from "@modules/exercises/infra/typeorm/entities/Treino";

@Entity("usuario", {database: "crossfit"})
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  email: string;

  @Column("varchar")
  senha: string;

  @Column("varchar")
  nome: string;

  @Column("int")
  idade: number;

  @Column("int")
  telefone: number;
  
  @Column("varchar")
  cpf: string;

  @Column("int")
  nivel_acesso: number;

  @OneToMany(() => Treino, treino => treino.user)
  treino: Treino[];
}

export default User;
