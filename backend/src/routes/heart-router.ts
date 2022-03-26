import followService from "@services/follow-service";
import heartService from "@services/heart-service";
import { Router } from "express";

const router = Router();

router.get("/check/heart", async (req, res, next) => {
  console.log("START check like nft...");
  const userSeq = Number(req.query.userSeq);
  const nftSeq = Number(req.query.nftSeq);
  const checkHeartNFT = await heartService.checkHeartNFT(userSeq, nftSeq);

  try {
    if (checkHeartNFT) {
      return res.status(200).json({ success: "y" });
    } else {
      return res.status(200).json({ success: "n" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

router.post("/like", async (req, res, next) => {
  console.log("START like nft...");

  const userSeq = Number(req.body.userSeq);
  const nftSeq = Number(req.body.nftSeq);
  try {
    const checkHeartNFT = await heartService.checkHeartNFT(userSeq, nftSeq);
    if (checkHeartNFT !== null) {
      return res.status(404).json({ fail: "해당 NFT 이미 좋아요 중" });
    } else {
      const result = await heartService.nftHeart(userSeq, nftSeq);
      if (result == 1) {
        return res.status(200).json({ success: "좋아요 성공" });
      } else if (result == 0) {
        return res
          .status(404)
          .json({ fail: "회원 번호나 NFT 번호가 유효하지 않음" });
      }
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

router.delete("/unlike", async (req, res, next) => {
  console.log("START unlike nft...");
  const userSeq = Number(req.body.userSeq);
  const nftSeq = Number(req.body.nftSeq);

  try {
    const checkHeartNFT = await heartService.checkHeartNFT(userSeq, nftSeq);
    if (checkHeartNFT == null) {
      return res.status(404).json({ fail: "해당 NFT 좋아요 중이 아님" });
    } else {
      const result = await heartService.nftUnHeart(userSeq, nftSeq);
      if (result == 1)
        return res.status(200).json({ success: "좋아요 취소 성공" });
      else if (result == 0)
        return res
          .status(404)
          .json({ fail: "회원 번호나 NFT 번호가 유효하지 않음" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ fail: error });
  }
});

export default router;
