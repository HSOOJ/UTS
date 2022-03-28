import { Request, Response, Router } from "express";
import nftService from "@services/nft-service";

const router = Router();

router.post("/minting", async (req, res, next) => {
  const {
    editionSeq,
    artistSeq,
    editionName,
    editionImage,
    editionDescription,
    editionRoyalty,
  } = req.body;
  await nftService.mintingNft(
    editionSeq,
    // artistSeq,
    editionName,
    editionImage,
    editionDescription,
    editionRoyalty
  );
  console.log("apitest");
  return res.status(400).json("testing");
});

export default router;
