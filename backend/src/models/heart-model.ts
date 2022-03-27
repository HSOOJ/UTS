import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Nft } from "./nft-model";
import { User } from "./user-model";

@Entity()
export class Heart {
  @PrimaryGeneratedColumn()
  heart_seq: number;

  @Column()
  nft_seq: number;

  @Column()
  user_seq: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;

  @ManyToOne(() => Nft, (nft) => nft.hearts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_seq", referencedColumnName: "nft_seq" }])
  nftSeq2: Nft;

  @ManyToOne(() => User, (user) => user.hearts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_seq", referencedColumnName: "user_seq" }])
  userSeq2: User;
}
