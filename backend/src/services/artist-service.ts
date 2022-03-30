// import { User } from "@models/user-model";
import { Artist } from "@models/Artist";

import { getConnection } from "typeorm";

function getAll(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_artist_followers_total", "DESC")
    .limit(12);

  return result.getRawMany();
}

// Export default
export default {
  getAll,
} as const;
