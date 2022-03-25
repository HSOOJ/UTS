import { Follow } from "@models/follow-model";
import followService from "@services/follow-service";
import { Router } from "express";

const router = Router();

router.post("/follow", async (req, res, next) => {
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;
  followService.artistFollow(userTo, userFrom);
});

export default router;
