/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, Router } from "express";
import mainService from "@services/main-service";
import { Artist } from "@models/Artist";
import artistService from "@services/artist-service";

const router = Router();

router.get("/nfts/popular", async (req, res, next) => {
  const result = await mainService.nftHeart();

  const map1 = result.map(function (x) {
    return {
      nftSeq: x.nft_nft_seq,
      editionSeq: x.nfts_edition_seq,
      editionName: x.nfts_edition_name,
      editionImage: x.nfts_edition_image,
      transactionCount: x.nft_nft_transaction_count,
    };
  });

  return res.status(200).json({
    success: map1,
  });
});

router.get("/artists/popular", async (req: Request, res: Response) => {
  const artists: Artist[] | null = await artistService.getAllbyPopular();
  if (artists != null) return res.status(200).json({ success: artists });
  else return res.status(404).json({ fail: "fail" });
});

router.get("/artists/latest", async (req: Request, res: Response) => {
  const artists: Artist[] | null = await artistService.getAllbyLatest();
  if (artists != null) return res.status(200).json({ success: artists });
  else return res.status(404).json({ fail: "fail" });
});

router.get("/topsellers", async (req, res, next) => {
  const result = await mainService.getTopSellers();
  return res.status(200).json({ success: result });
});
export default router;
