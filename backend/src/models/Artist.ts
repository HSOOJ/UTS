import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
} from "typeorm";

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
  // @DeleteDateColumn()
  @Column()
  del_yn: boolean;
}
