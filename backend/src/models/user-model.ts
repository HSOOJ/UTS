import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_seq: number;

  @Column()
  user_nickname: string;

  @Column()
  user_wallet_address: string;

  @Column()
  user_profile_image: string;

  @Column()
  user_role: number; //(0: 일반회원, 1: 아티스트, 2: 관리자)

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;
}
