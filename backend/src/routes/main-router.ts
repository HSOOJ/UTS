import { Request, Response, Router } from "express";
import mainService from "@services/main-service";
const router = Router();

router.get("/nfts/popular", async (req, res, next) => {
  const result = await mainService.nftHeart();

  const map1 = result.map(function (x) {
    return {
      editionName: x.nfts_edition_name,
      editionImage: x.nfts_edition_image,
      transactionCount: x.nft_nft_transaction_count,
    };
  });

  return res.status(200).json({
    success: map1,
  });
});
export default router;
