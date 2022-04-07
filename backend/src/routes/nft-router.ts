import { Request, Response, Router } from "express";
import nftService from "@services/nft-service";
import { Nft } from "@models/nft-model";
import { getConnection } from "typeorm";

const router = Router();

router.post("/minting", async (req, res, next) => {
  const userSeq = req.body.userSeq;
  const editionName = req.body.editionName;
  const editionImage = req.body.editionImage;
  const editionDescription = req.body.editionDescription;
  const editionRoyalty = req.body.editionRoyalty;
  const editionTotal = req.body.editionTotal;
  const salePrice = req.body.salePrice;
  const nftId = req.body.nftId;
  const nftTransactionId = req.body.nftTransactionId;

  const result = await nftService.editionMinting(
    Number(userSeq),
    String(editionName),
    String(editionImage),
    String(editionDescription),
    Number(editionRoyalty),
    Number(editionTotal),
    Number(salePrice),
    Number(nftId),
    String(nftTransactionId)
  );

  if (result === 1) {
    return res.status(200).json({ success: "" });
  } else {
    return res.status(404).json({ fail: "" });
  }
});

router.get("/info", async (req, res, next) => {
  const nftSeq = Number(req.query.nftSeq);
  const nftRepository = getConnection().getRepository(Nft);
  const nftinfo = await nftRepository.findOne({
    where: {
      nft_seq: nftSeq,
    },
  });
  const editioninfo = await nftService.getEditionInfo(
    nftSeq,
    Number(nftinfo?.edition_seq)
  );
  return res.status(200).json({ success: { editioninfo, nftinfo } });
});


export default router;
