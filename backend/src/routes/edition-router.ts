import artistService from "@services/artist-service";
import editionService from "@services/edition-service";
import heartService from "@services/heart-service";
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
    if (artistInfo) {
      const artistImage = Object.values(
        JSON.parse(JSON.stringify(artistInfo))
      )[12];

      const userSeq = Object.values(JSON.parse(JSON.stringify(artistInfo)))[2];

      return res.status(200).json({
        success: {
          edition_seq: editionInfo.edition_seq,
          edition_name: editionInfo.edition_name,
          edition_image: editionInfo.edition_image,
          edition_description: editionInfo.edition_description,
          artist_image: artistImage,
          artist_seq: editionInfo.artist_seq,
          artist_user_seq: userSeq, // 유저 seq
        },
      });
    } else
      return res.status(404).json({ fail: "아티스트 정보가 유효 하지 않음" });
  } else return res.status(404).json({ fail: "에디션 정보가 유효 하지 않음" });
});

async function nfts(editionSeq: number, userSeq: number) {
  const editionInfo = await editionService.getEditionInfo(editionSeq);
  const nftInfo = await nftService.returnNFTOwner(editionSeq);

  let res = new Array();
  if (editionInfo) {
    for (let i = 0; i < nftInfo.length; i++) {
      const cur = nftInfo[i];
      const editionImage = await editionService.returnEditionImage(editionSeq);
      const saleInfo = await saleService.returnNft(cur.nft_nft_seq);
      const heartInfo = await heartService.checkHeartNFT(
        userSeq,
        cur.nft_nft_seq
      );
      let isHeart = "n";
      if (heartInfo !== null) isHeart = "y";

      res.push({
        edition_image: editionImage, // 에디션 사진
        nft_seq: cur.nft_nft_seq, // NFT 시퀀스
        nft_num: cur.nft_nft_num, // 뱃지의 번호
        nft_owner_image: cur.user_user_profile_image, // 뱃지 주인 사진
        nft_owner_seq: cur.user_user_seq, // 뱃지 주인 시퀀스
        nft_price: saleInfo.latest, // 현재 가격
        nft_is_soldout: saleInfo.isSale, // nft 판매 여부
        isheart: isHeart, // NFT 하트 여부
      });
    }
  }
  return res;
}

router.get("/nfts", async (req, res, next) => {
  const editionSeq = Number(req.query.editionSeq);
  const userSeq = Number(req.query.userSeq);
  const result = await nfts(editionSeq, userSeq);

  if (result.length > 0) return res.status(200).json({ success: result });
  return res.status(404).json({ fail: "에디션 정보가 유효 하지 않음" });
});

router.get("/seq", async (req, res, next) => {
  const editionSeq = await editionService.getMaxEditionSeq();
  return res.status(200).json({ success: editionSeq });
});
export default router;
