import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Artist } from "./Artist";
import { Heart } from "./heart-model";
import { Nft } from "./nft-model";

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

  @OneToMany(() => Heart, (heart) => heart.userSeq2)
  hearts: Heart[];

  @OneToMany(() => Nft, (nft) => nft.nftOwnerSeq2)
  @JoinColumn({ name: "nfts" })
  nfts: Nft[];
  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;
}
