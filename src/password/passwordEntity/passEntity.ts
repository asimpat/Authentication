import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('password')
export class Password{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;
}
