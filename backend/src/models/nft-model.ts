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
  OneToOne,
} from "typeorm";
import { Edition } from "./edition-model";
import { Heart } from "./heart-model";
import { NftSorting } from "./nft-sorting-model";
import { Sale } from "./sale-model";
import { User } from "./user-model";

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

  @Column()
  nft_transaction_count: number;

  @Column()
  nft_volume: number;

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
  @JoinColumn({ name: "edition_seq" })
  //, referencedColumnName: "edition_seq" }])
  edition: Edition;

  @OneToMany(() => Heart, (heart) => heart.nftSeq2)
  hearts: Heart[];

  @OneToMany(() => Sale, (sale) => sale.nftSeq2)
  sales: Sale[];

  @JoinColumn({ name: "nfts" })
  nftOwnerSeq2: User;

  @OneToMany(() => NftSorting, (nftSorting) => nftSorting.nftSeq2)
  nftSortings: NftSorting[];
}
