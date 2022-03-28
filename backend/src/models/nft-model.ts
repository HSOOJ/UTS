import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Edition } from "./edition-model";
import { Heart } from "./heart-model";
import { Sale } from "./sale-model";

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  nft_seq: number;

  @Column()
  edition_seq: number;

  @Column()
  nft_author_seq: number;

  @Column()
  nft_owner_seq: number;

  @Column()
  nft_num: number;

  @Column()
  nft_id: string;

  @Column()
  nft_transaction_id: string;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;

  @ManyToOne(() => Edition, (edition) => edition.nfts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "edition_seq", referencedColumnName: "edition_seq" }])
  editionSeq2: Edition;

  @OneToMany(() => Heart, (heart) => heart.nftSeq2)
  hearts: Heart[];

  @OneToMany(() => Sale, (sale) => sale.nftSeq2)
  sales: Sale[];
}
