import { Follow } from "@models/follow-model";
import followService from "@services/follow-service";
import { Router } from "express";

const router = Router();

router.get("/check/follow", async (req, res, next) => {
  const userTo = Number(req.query.userTo);
  const userFrom = Number(req.query.userFrom);
  const checkFollow = await followService.artistCheckFollow(userTo, userFrom);

  try {
    if (checkFollow) {
      return res.status(200).json({ success: "y" });
    } else {
      return res.status(200).json({ success: "n" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

router.post("/follow", async (req, res, next) => {
  const userTo = Number(req.body.userTo);
  const userFrom = Number(req.body.userFrom);
  try {
    const checkFollow = await followService.artistCheckFollow(userTo, userFrom);
    if (checkFollow) {
      return res.status(404).json({ fail: "해당 아티스트 이미 팔로우 중" });
    }
    const result = await followService.artistFollow(userTo, userFrom);
    if (result == 1) {
      return res.status(200).json({ success: "" });
    } else if (result == 0) {
      return res.status(404).json({ fail: "" });
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
