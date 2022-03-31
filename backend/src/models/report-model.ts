import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Artist } from "./Artist";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  report_seq: number;

  @Column()
  artist_seq: number;

  @ManyToOne(() => Artist, (artist) => artist.reports)
  @JoinColumn({ name: "artist_seq", referencedColumnName: "artist_seq" })
  artist: Artist;

  @Column()
  user_seq: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;
}
