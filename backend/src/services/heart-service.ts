import { Heart } from "@models/heart-model";
import { NftRepository } from "@repos/nft-repo";
import { getConnection } from "typeorm";
import nftService from "./nft-service";
import userService from "./user-service";
import logger from "jet-logger";

// 좋아요 한 NFT인지 체크
async function checkHeartNFT(userSeq: number, nftSeq: number) {
  console.log("PROCEEDING check like nft ");

  const heartRepository = getConnection().getRepository(Heart);

  return heartRepository.findOne({
    where: {
      user_seq: userSeq,
      nft_seq: nftSeq,
    },
  });
}

// NFT 좋아요하기
async function nftHeart(userSeq: number, nftSeq: number) {
  console.log("PROCEEDING like nft ");

  const heartRepository = getConnection().getRepository(Heart);
  const nowDate = new Date();
  try {
    const checkUser = userService.checkUserSeq(userSeq);
    const checkNft = nftService.checkNftSeq(nftSeq);
    const checkHeart = await checkHeartNFT(userSeq, nftSeq);

    if (checkHeart == null) {
      if (checkUser !== null && checkNft !== null) {
        await heartRepository.insert({
          nft_seq: nftSeq,
          user_seq: userSeq,
          reg_dt: nowDate,
          mod_dt: nowDate,
        });
        console.log("좋아요 성공");
        return 1;
      } else {
        console.log("회원 번호나 NFT 번호가 유효하지 않음");
        return 0;
      }
    } else {
      console.log("이미 좋아요한 NFT");
      return 0;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  nftHeart,
  checkHeartNFT,
} as const;
