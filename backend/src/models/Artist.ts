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
  ManyToOne,
} from "typeorm";
import { Common_code } from "./common_code-model";
import { Edition } from "./edition-model";
import { Report } from "./report-model";
import { User } from "./user-model";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_seq: number;

  @Column()
  user_seq: number; // FK

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

  @OneToMany(() => Report, (report) => report.artist)
  @JoinColumn()
  reports: Report[];

  @ManyToOne(() => Common_code, (common_code) => common_code.artists)
  @JoinColumn({ name: "code_seq", referencedColumnName: "code_seq" })
  code_seq2: Common_code;
}
