import { Artist } from "@models/Artist";
import { EntityRepository, Repository } from "typeorm";
// import { User } from "@models/user-model";
// import { getConnection } from "typeorm";

// const connection = getConnection();

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
  //   findById(id: number): Promise<Artist | null> {
  // return this.createQueryBuilder("artist")
  //   .where("artist.artist_seq = : id", {
  // id,
  //   })
  //   .getOne();
  //   }
}
