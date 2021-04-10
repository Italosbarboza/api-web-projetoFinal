import User from "@modules/users/infra/typeorm/entities/User";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";

@Entity("treino", {database: "crossfit"})
class Treino {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("date")
  data_treino: Date;

  @Column("text")
  aquecimento: string;

  @Column("text")
  tecnica: string;

  @Column("text")
  wood: string;

  @Column("int")
  id_professor: number;
}

export default Treino;
