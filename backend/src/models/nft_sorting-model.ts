import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Nft } from "./nft-model";

@Entity()
export class NftSorting {
  @PrimaryGeneratedColumn()
  nft_sorting_seq: number;

  // @OneToOne((type) => Nft, (nft) => nft.nft_seq)
  // @JoinColumn()
  // nft: Nft;

  @Column()
  nft_sorting_transaction_count: number;

  @Column()
  nft_sorting_volume: number;

  @Column()
  nft_sorting_latest: number;

  @Column()
  nft_sorting_hearts: number;
}
