import { Artist } from "@models/Artist";
import { Report } from "@models/report-model";
import { User } from "@models/user-model";

import { getConnection } from "typeorm";

function getAllbyPopular(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_artist_followers_total", "DESC")
    .limit(13);

  return result.getRawMany();
}

function getAllbyLatest(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_reg_dt", "DESC")
    .limit(13);

  return result.getRawMany();
}

async function getArtistInfo(artistSeq: number) {
  const result = await getConnection()
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .leftJoinAndSelect(User, "user", "artist.user_seq = user.user_seq")
    .where(`artist.artist_seq = ${artistSeq}`)
    .getRawOne();

  return result;
}

async function report(userSeq: number, artistSeq: number) {
  const nowDate = new Date();
  const connection = getConnection();
  return connection.getRepository(Report).save({
    user_seq: userSeq,
    artist_seq: artistSeq,
    reg_dt: nowDate,
    mod_dt: nowDate,
  });
}

// Export default
export default {
  getAllbyPopular,
  getAllbyLatest,
  getArtistInfo,
  report,
} as const;
