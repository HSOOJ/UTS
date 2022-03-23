// import marketRepo from "@repos/market-repo";
import { Artist } from "@models/Artist";
// import { UserNotFoundError } from '@shared/errors';
// import logger from "jet-logger";
import { getConnection } from "typeorm";

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(sortby: string, category: string): Promise<Artist | null> {
  // logger.info(marketRepo.getArtists(sortby, category));
  // return marketRepo.getArtists(sortby, category);
  const connection = getConnection();
  const artistRepository = connection.getRepository(Artist);
  return artistRepository.findOneById(1);
}

// Export default
export default {
  getArtists,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
} as const;
