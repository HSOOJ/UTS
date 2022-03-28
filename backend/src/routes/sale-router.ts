import nftService from "@services/nft-service";
import saleService from "@services/sale-service";
import { Request, Response, Router } from "express";
const router = Router();

router.post("/buy", async (req, res, next) => {
  console.log("START buy nft...");
  const userSeq = Number(req.body.userSeq);
  const nftSeq = Number(req.body.nftSeq);
  //   const nftId = Number(req.body.nftId);
  //   const nftTransactionId = Number(req.body.nftTransactionId);

  const result = await nftService.updateOwner(userSeq, nftSeq);
  if (result !== 0) {
    return res.status(200).json({
      success: {
        salePrice: result,
      },
    });
  } else {
    return res.status(404).json({ fail: "NFT 구매 실패" });
  }
});

router.post("/sell", async (req, res, next) => {
  console.log("START sell nft...");
  const nftSeq = Number(req.body.nftSeq);
  const salePrice = Number(req.body.salePrice);

  const result = await saleService.sell(nftSeq, salePrice);
  if (result !== 0) {
    return res.status(200).json({ success: "NFT 판매 등록 성공" });
  } else {
    return res.status(404).json({ fail: "NFT 판매 등록 실패" });
  }
});

export default router;
