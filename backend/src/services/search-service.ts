// import marketRepo from "@repos/market-repo";
import { User } from "@models/user-model";
import { Artist } from "@models/Artist";
// import { common_code } from "@models/common_code";
// import { UserNotFoundError } from '@shared/errors';
import logger from "jet-logger";
import { getConnection } from "typeorm";

// const sortbyList: String[] = ["latest","count","volume","artist_followers_total"];

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(input: string): Promise<Artist[] | null> {
  // logger.info(marketRepo.getArtists(sortby, category));
  // return marketRepo.getArtists(sortby, category);
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("user.user_seq")
        .from(User, "user")
        .where(`user.user_nickname Like '%${input}%'`);
      return "artist.user_seq in " + subQuery.getQuery();
    });

  return result.getMany();
}

// Export default
export default {
  getArtists,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
} as const;
