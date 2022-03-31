import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Artist } from "./Artist";

@Entity()
export class Common_code {
  @PrimaryGeneratedColumn()
  code_seq: number;

  @Column()
  code: string;

  @Column()
  code_order: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;

  @OneToMany(() => Artist, (artist) => artist.code_seq2)
  artists: Artist[];
}
