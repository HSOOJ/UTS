/* eslint-disable @typescript-eslint/no-misused-promises */
// import StatusCodes from "http-status-codes";
// import logger from "jet-logger";
import { Request, Response, Router } from "express";
import { Artist } from "@models/Artist";
// import { IArtistCard } from "@models/ArtistCard-model";

import marketService from "@services/market-service";
import userService from "@services/user-service";
import editionService from "@services/edition-service";
// import { ParamMissingError } from "@shared/errors";

// Constants
const router = Router();
// const {
// CREATED,
// OK,
// } = StatusCodes;

// sortby: (latest, count, volume, popular)
// category: (all, music, art, sport, actor, fashion, creator, other)

/**
 * Get artists by sortby and category.
 */
router.get("/artists", async (req: Request, res: Response) => {
  const sortby = Number(req.query.sortby);
  const category = Number(req.query.category);
  const artists: Artist[] | null = await marketService.getArtists(
    sortby,
    category
  );
  if (artists != null) return res.status(200).json({ success: artists });
  else return res.status(404).json({ fail: "해당 NFT 없음" });
});

// sortby: (price high, price low, like, new)
router.get("/nfts", async (req: Request, res: Response) => {
  const sortby = Number(req.query.sortby);
  const category = Number(req.query.category);
  const result = await nfts(sortby, category);

  if (result.length > 0) return res.status(200).json({ success: result });
  else
    return res
      .status(404)
      .json({ fail: "카테고리에 NFT가 없거나 NFT가 유효하지 않음" });
});

async function nfts(sortby: number, category: number) {
  let result;
  if (category === 0) {
    result = await marketService.joinCode(sortby);
  } else {
    result = await marketService.joinCodeCategory(category, sortby);
  }
  let res = new Array();
  if (result) {
    for (let i = 0; i < result.length; i++) {
      const cur = result[i];
      const editionInfo = await editionService.getEditionInfo(
        cur.nft_edition_seq
      );
      const artistImg = await userService.getAllUserProfileImage(
        cur.nft_nft_author_seq
      );
      const ownerImg = await userService.getAllUserProfileImage(
        cur.nft_nft_owner_seq
      );
      res.push({
        editionImage: editionInfo?.edition_image, // 뱃지 사진
        editionName: editionInfo?.edition_name, // 에디션 이름
        nftNum: cur.nft_nft_num, // nft 번호
        nftSeq: cur.nft_nft_seq, // nft 시퀀스
        nftPrice: cur.sale_sale_price, // nft 판매 가격
        nftAuthorImage: artistImg, // 아티스트 사진
        nftAuthorSeq: cur.nft_nft_author_seq, // 아티스트 시퀀스
        nftOwnerImage: ownerImg, // 소유자 사진
        nftOwnerSeq: cur.nft_nft_owner_seq, // 소유자 시퀀스
        heart: cur.count, // 좋아요 개수
        nftRegDt: cur.sale_reg_dt,
      });
    }
  }
  return res;
}

// Export default
export default router;
