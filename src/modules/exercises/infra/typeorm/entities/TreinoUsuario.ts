import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuariotreino", {database: "crossfit"})
class TreinoUsuario {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  id_usuario: number;

  @Column("int")
  id_treino: number;

  @Column("decimal")
  quilocalorias_queimadas: string;

  @Column("int")
  batimento_cardiaco: string;

  @Column("decimal")
  massa_muscular: string;

  @Column("decimal")
  porcentagem_gordura: string;
  
  @Column("date")
  data_cadastro: string;
}

export default TreinoUsuario;
