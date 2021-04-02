import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_nivel", {database: "sabm"})
class UserLevel {
  @PrimaryGeneratedColumn()
  bm_codigo: string;

  @Column("varchar")
  grupo_nome: string;

  @Column("varchar")
  sistema_nome: string;
}

export default UserLevel;
