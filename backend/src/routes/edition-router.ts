import artistService from "@services/artist-service";
import editionService from "@services/edition-service";
import userService from "@services/user-service";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/info", async (req, res, next) => {
  const editionSeq = Number(req.query.editionSeq);

  const editionInfo = await editionService.getEditionInfo(editionSeq);
  if (editionInfo) {
    const artistInfo = await artistService.getArtistInfo(
      editionInfo.artist_seq
    );
    return res.status(200).json({
      success: {
        edition_seq: editionInfo.edition_seq,
        edition_name: editionInfo.edition_name,
        edition_image: editionInfo.edition_image,
        edition_description: editionInfo.edition_description,
        artist_image: artistInfo.artist_image,
      },
    });
  } else return res.status(404).json({ fail: "에디션 정보가 유효하지 않음" });
});
export default router;
