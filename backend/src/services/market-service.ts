// import marketRepo from "@repos/market-repo";
import { Artist } from "@models/Artist";
// import { common_code } from "@models/common_code";
// import { UserNotFoundError } from '@shared/errors';
// import logger from "jet-logger";
import { getConnection } from "typeorm";

// const sortbyList: String[] = ["latest","count","volume","artist_followers_total"];

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(
  sortby: number,
  category: number
): Promise<Artist[] | null> {
  // logger.info(marketRepo.getArtists(sortby, category));
  // return marketRepo.getArtists(sortby, category);
  const connection = getConnection();
  const artistRepository = connection.getRepository(Artist);
  // const commonCodeRepository = connection.getRepository(common_code);

  // let code: number;
  // commonCodeRepository
  // .findOne({
  // where: {
  // code: category,
  // },
  // })
  // .then((result) => {
  // logger.info(result);
  // });

  if (category == 0) {
    return artistRepository.find({
      order: {
        artist_followers_total: "DESC",
      },
    });
  }

  switch (sortby) {
    case 1:
      // latest
      break;
    case 2:
      // count
      break;
    case 3:
      // volume
      break;
    case 4:
      return artistRepository.find({
        where: {
          code_seq: category,
        },
        order: {
          artist_followers_total: "DESC",
        },
      });
      break;
  }

  return artistRepository.find({
    where: {
      code_seq: category,
    },
    order: {
      artist_followers_total: "DESC",
    },
  });
  // return artistRepository.findOneById(1);
}

// Export default
export default {
  getArtists,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
} as const;
