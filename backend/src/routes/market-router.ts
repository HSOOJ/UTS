/* eslint-disable @typescript-eslint/no-misused-promises */
// import StatusCodes from "http-status-codes";
// import logger from "jet-logger";
import { Request, Response, Router } from "express";
import { Artist } from "@models/Artist";
// import { IArtistCard } from "@models/ArtistCard-model";

import marketService from "@services/market-service";
// import { ParamMissingError } from "@shared/errors";

// Constants
const router = Router();
// const {
// CREATED,
// OK,
// } = StatusCodes;

// sortby: (latest, count, volume, popular)
// category: (all, music, art, sport, actor, fashion, creator, other)

/**
 * Get artists by sortby and category.
 */
router.get("/artists", async (req: Request, res: Response) => {
  const sortby = Number(req.query.sortby);
  const category = Number(req.query.category);
  const artists: Artist[] | null = await marketService.getArtists(
    sortby,
    category
  );
  if (artists != null) return res.status(200).json({ artists });
  else return res.status(404);
});

// Export default
export default router;
