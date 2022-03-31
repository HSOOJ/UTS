import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  report_seq: number;

  @Column()
  user_seq: number;

  @Column()
  artist_seq: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;
}
