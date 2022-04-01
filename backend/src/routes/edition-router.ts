import artistService from "@services/artist-service";
import editionService from "@services/edition-service";
import nftService from "@services/nft-service";
import saleService from "@services/sale-service";
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

/*
NFT 시퀀스
에디션 사진
NFT 번호 

현재 소유자 유저 시퀀스
현재 소유자 프로필 사진

현재 가격
판매 여부
*/

router.get("/nfts", async (req, res, next) => {
  const editionSeq = Number(req.query.editionSeq);

  const editionInfo = await editionService.getEditionInfo(editionSeq);
  const nftInfo = await nftService.returnNFTOwner(editionSeq);

  if (editionInfo) {
    for (let i = 0; i < nftInfo.length; i++) {
      const cur = nftInfo[i];
      const editionImage = await editionService.returnEditionImage(editionSeq);
      console.log(editionImage);
      const saleInfo = await saleService.returnNft(cur.nft_nft_seq);
      return res.status(200).json({
        success: {
          edition_image: editionImage, // 에디션 사진
          nft_seq: cur.nft_nft_seq, // NFT 시퀀스
          nft_num: cur.nft_nft_num, // 뱃지의 번호
          nft_owner_image: cur.user_user_profile_image, // 뱃지 주인 사진
          nft_owner_seq: cur.user_user_seq, // 뱃지 주인 시퀀스
          nft_price: saleInfo.latest, // 현재 가격
          nft_isSale: saleInfo.isSale, // nft 판매 여부
        },
      });
    }
  } else return res.status(404).json({ fail: "에디션 정보가 유효 하지 않음" });
});
export default router;
