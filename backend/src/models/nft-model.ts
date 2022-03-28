import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  nft_seq: number;
  @Column()
  edition_seq: number;
  @Column()
  nft_authoer_seq: number;
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
}
