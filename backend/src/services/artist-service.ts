// import { User } from "@models/user-model";
import { Artist } from "@models/Artist";

import { getConnection } from "typeorm";

function getAllbyPopular(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_artist_followers_total", "DESC")
    .limit(12);

  return result.getRawMany();
}

function getAllbyLatest(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_reg_dt", "DESC")
    .limit(12);

  return result.getRawMany();
}

// Export default
export default {
  getAllbyPopular,
  getAllbyLatest,
} as const;
