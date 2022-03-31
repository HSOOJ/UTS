/* eslint-disable @typescript-eslint/no-misused-promises */
import artistService from "@services/artist-service";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/report", async (req: Request, res: Response) => {
  const userSeq = Number(req.body.userSeq);
  const artistSeq = Number(req.body.artistSeq);

  const result = artistService.report(userSeq, artistSeq);

  if ((await result).report_seq) {
    return res.status(200).json({ success: "신고되었습니다." });
  } else {
    return res.status(404).json({ fail: "신고에 실패했습니다." });
  }
});

export default router;
