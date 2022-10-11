import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authentication')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
