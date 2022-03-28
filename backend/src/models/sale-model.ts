import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Nft } from "./nft-model";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn({ type: "bigint", name: "sale_seq" })
  sale_seq: number;

  @Column("bigint", { name: "nft_seq" })
  nft_seq: number;

  @Column("double", { name: "sale_price", precision: 22 })
  sale_price: number;

  @CreateDateColumn()
  reg_dt: Date;

  @UpdateDateColumn()
  mod_dt: Date;

  @DeleteDateColumn()
  del_dt: Date;

  @ManyToOne(() => Nft, (nft) => nft.sales, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_seq", referencedColumnName: "nft_seq" }])
  nftSeq2: Nft;
}
