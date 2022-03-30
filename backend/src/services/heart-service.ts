import { Heart } from "@models/heart-model";
import { NftRepository } from "@repos/nft-repo";
import { getConnection, IsNull } from "typeorm";
import nftService from "./nft-service";
import userService from "./user-service";
import logger from "jet-logger";

// 좋아요 한 NFT인지 체크
async function checkHeartNFT(userSeq: number, nftSeq: number) {
  console.log("PROCEEDING check like nft...");

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
  console.log("PROCEEDING like nft...");

  const heartRepository = getConnection().getRepository(Heart);
  const nowDate = new Date();
  try {
    const checkUser = await userService.checkUserSeq(userSeq);
    const checkNft = await nftService.returnNft(nftSeq);

    if (checkUser !== null && checkNft != null) {
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
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function nftUnHeart(userSeq: number, nftSeq: number) {
  console.log("PROCEEDING unlike nft...");

  const heartRepository = getConnection().getRepository(Heart);

  try {
    const checkUser = await userService.checkUserSeq(userSeq);
    const checkNft = await nftService.returnNft(nftSeq);
    const checkHeart = await checkHeartNFT(userSeq, nftSeq);

    if (checkUser !== null && checkNft !== null && checkHeart != null) {
      heartRepository
        .createQueryBuilder()
        .softDelete()
        .where({ user_seq: userSeq, nft_seq: nftSeq })
        .execute();
      console.log("좋아요 취소 성공");
      return 1;
    } else {
      console.log("회원 번호나 NFT 번호가 유효하지 않음");
      return 0;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function countHeart(nftSeq: number) {
  const heartRepository = getConnection().getRepository(Heart);
  const res = heartRepository
    .createQueryBuilder()
    .select("count(nft_seq)", "heart")
    .where({ nft_seq: nftSeq })
    .getRawOne();

  return res;
}

export default {
  countHeart,
  nftHeart,
  nftUnHeart,
  checkHeartNFT,
} as const;
