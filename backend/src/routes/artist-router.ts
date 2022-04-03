/* eslint-disable @typescript-eslint/no-misused-promises */
import { Artist } from "@models/Artist";
import { Edition } from "@models/edition-model";
import artistService from "@services/artist-service";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/info", async (req: Request, res: Response) => {
  const artistSeq = Number(req.query.artistSeq);

  const result: Artist | null | undefined = await artistService.getArtistInfo(
    artistSeq
  );

  if (result) {
    return res.status(200).json({ success: result });
  } else {
    return res.status(404).json({ fail: "fail" });
  }
});

router.get("/editions", async (req: Request, res: Response) => {
  const artistSeq = Number(req.query.artistSeq);

  const result: Edition[] | null = await artistService.getEditions(artistSeq);

  if (result) {
    return res.status(200).json({ success: result });
  } else {
    return res.status(404).json({ fail: "fail" });
  }
});

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
