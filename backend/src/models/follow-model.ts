import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  follow_seq: number;

  @Column()
  user_to: number;

  @Column()
  user_from: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;
}
