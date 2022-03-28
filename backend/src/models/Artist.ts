import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Edition } from "./edition-model";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_seq: number;
  @JoinColumn()
  @Column()
  user_seq: number; // FK
  @JoinColumn()
  @Column()
  code_seq: number; // FK
  @Column()
  artist_description: string;
  @Column()
  artist_sns: string;
  @Column()
  artist_followers_total: number;
  @CreateDateColumn()
  reg_dt: Date;
  @UpdateDateColumn()
  mod_dt: Date;
  @DeleteDateColumn()
  // @Column()
  del_dt: Date;
  @OneToMany(() => Edition, (edition) => edition.artistSeq2)
  editions: Edition[];
}
