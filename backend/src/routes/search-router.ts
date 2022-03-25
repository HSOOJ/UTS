/* eslint-disable @typescript-eslint/no-misused-promises */
// import StatusCodes from "http-status-codes";
// import logger from "jet-logger";
import { Request, Response, Router } from "express";
import { Artist } from "@models/Artist";
// import { IArtistCard } from "@models/ArtistCard-model";

import searchService from "@services/search-service";
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
  const input = String(req.query.input);
  const artists: Artist[] | null = await searchService.getArtists(input);
  if (artists != null) return res.status(200).json({ success: artists });
  else return res.status(404).json({ fail: "fail" });
});

// Export default
export default router;
