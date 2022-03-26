import followService from "@services/follow-service";
import heartService from "@services/heart-service";
import { Router } from "express";

const router = Router();

router.get("/check/heart", async (req, res, next) => {
  console.log("START check like nft ");
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

router.post("/heart", async (req, res, next) => {
  console.log("START like nft ");

  const userSeq = Number(req.query.userSeq);
  const nftSeq = Number(req.query.nftSeq);
  try {
    const checkHeartNFT = await heartService.checkHeartNFT(userSeq, nftSeq);
    if (checkHeartNFT) {
      return res.status(404).json({ fail: "해당 NFT 이미 좋아요 중" });
    }
    const result = await heartService.nftHeart(userSeq, nftSeq);
    if (result == 1) {
      return res.status(200).json({ success: "좋아요 성공" });
    } else if (result == 0) {
      return res
        .status(404)
        .json({ fail: "회원 번호나 NFT 번호가 유효하지 않음" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

router.delete("/unfollow", async (req, res, next) => {
  const userTo = Number(req.body.userTo);
  const userFrom = Number(req.body.userFrom);
  try {
    const checkFollow = await followService.artistCheckFollow(userTo, userFrom);
    if (!checkFollow) {
      return res.status(404).json({ fail: "해당 아티스트 팔로우 중이 아님" });
    } else {
      await followService.artistUnFollow(userTo, userFrom);
      return res.status(200).json({ success: "" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ fail: error });
  }
});

export default router;
