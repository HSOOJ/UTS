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
        artist_seq: artistInfo.artist_artist_seq,
      },
    });
  } else return res.status(404).json({ fail: "에디션 정보가 유효 하지 않음" });
});

// router.get("/nfts", async (req, res, next) => {
//   //뱃지 사진, 뱃지의 번호, 뱃지 가격, 현재 뱃지 주인 사진, 판매 중 X 것도 보이게
//   const editionSeq = Number(req.query.editionSeq);

//   const editionInfo = await editionService.getEditionInfo(editionSeq);
//   if (editionInfo) {
//     const artistInfo = await artistService.getArtistInfo(
//       editionInfo.artist_seq
//     );
//     return res.status(200).json({
//       success: {
//         edition_image: editionInfo.edition_seq, // 뱃지 사진
//         nft_num: editionInfo.edition_name, // 뱃지의 번호
//         edition_image: editionInfo.edition_image, // 뱃지 가격
//         nft_owner_image: editionInfo.edition_description, // 뱃지 주인 사진
//         artist_image: artistInfo.artist_image,
//         artist_seq: artistInfo.artist_seq,
//       },
//     });
//   } else return res.status(404).json({ fail: "에디션 정보가 유효 하지 않음" });
// });
export default router;
