import {
  Column,
  ManyToMany,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artist } from "@models/Artist";

@Entity()
export class Edition {
  @PrimaryGeneratedColumn()
  edition_seq: number;
  // @ManyToMany((type) => Artist)
  // @JoinColumn({
  //   name: "artist_seq",
  //   referencedColumnName: "artist_seq",
  // })
  // category: Artist;
  // @Column()
  @ManyToMany((type) => Artist)
  @JoinColumn({
    name: "artist_seq",
    referencedColumnName: "artist_artist_seq",
  })
  artist: Artist;
  @Column()
  edition_name: string;
  @Column()
  edition_image: string;
  @Column()
  edition_description: string;
  @Column()
  edition_royalty: number;
  @CreateDateColumn()
  reg_dt: Date;
}
