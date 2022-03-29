import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Nft } from "./nft-model";

@Entity()
export class NftSorting {
  @PrimaryGeneratedColumn()
  nft_sorting_seq: number;

  @Column()
  nft_seq: number;

  @Column()
  nft_sorting_transaction_count: number;

  @Column()
  nft_sorting_volume: number;

  @Column()
  nft_sorting_latest: number;

  @Column()
  nft_sorting_hearts: number;

  @ManyToOne(() => Nft, (nft) => nft.nftSortings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_seq", referencedColumnName: "nft_seq" }])
  nftSeq2: Nft;
}
