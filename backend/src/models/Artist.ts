import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Edition } from "./edition-model";
import { User } from "./user-model";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_seq: number;
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
  del_dt: Date;
  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_seq", referencedColumnName: "user_seq" })
  user: User;
  @OneToMany(() => Edition, (edition) => edition.artist_seq)
  editions: Edition[];
}
