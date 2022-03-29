import { Request, Response, Router } from "express";
import nftService from "@services/nft-service";

const router = Router();

router.post("/minting", async (req, res, next) => {
  const userSeq = req.body.userSeq;
  const editionName = req.body.editionName;
  const editionImage = req.body.editionImage;
  const editionDescription = req.body.editionDescription;
  const editionRoyalty = req.body.editionRoyalty;
  const editionTotal = req.body.editionTotal;
  const salePrice = req.body.salePrice;

  const result = await nftService.editionMinting(
    Number(userSeq),
    String(editionName),
    String(editionImage),
    String(editionDescription),
    Number(editionRoyalty),
    Number(editionTotal),
    Number(salePrice)
  );

  if (result === 1) {
    return res.status(200).json({ success: "" });
  } else {
    return res.status(404).json({ fail: "" });
  }
});
export default router;
