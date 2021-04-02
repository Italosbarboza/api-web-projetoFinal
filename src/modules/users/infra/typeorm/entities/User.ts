import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Exclude } from "class-transformer";
import Groups from "./Groups";

@Entity("usuario", {database: "crossfit"})
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  @Exclude()
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
}

export default User;
