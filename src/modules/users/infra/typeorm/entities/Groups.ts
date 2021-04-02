import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@Entity("sec_groups", {database: "sabm"})
class Groups {
  @PrimaryGeneratedColumn("increment")
  group_id: number;
 
  @Column("varchar")
  description: string;

  @Column("int")
  sistema_id: number;

  @ManyToMany(type => User, users => (user: User) => users.groups)
  users: User[]; 
}

export default Groups;