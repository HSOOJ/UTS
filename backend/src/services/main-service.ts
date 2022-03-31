import { Edition } from "@models/edition-model";
import { Heart } from "@models/heart-model";
import { Nft } from "@models/nft-model";
import { NftSorting } from "@models/nft_sorting-model";
import { User } from "@models/user-model";
import { getConnection } from "typeorm";

async function nftHeart() {
  const heartRepository = getConnection().getRepository(Heart);

  const heartTotal = await heartRepository
    .createQueryBuilder("heart")
    .select(["heart.nft_seq AS nft_seq", "nft.nft_seq"])
    .addSelect("COUNT(*) AS heartCount")
    .groupBy("heart.nft_seq")
    .orderBy("heartCount", "DESC")
    .leftJoinAndSelect("heart.nftSeq2", "nft")
    .leftJoinAndSelect("nft.edition", "nfts")
    .getRawMany();
  console.log(heartTotal);

  return heartTotal.slice(0, 12);
}

async function getTopSellers() {
  const userRepository = getConnection().getRepository(User);

  const topsellers = await userRepository
    .createQueryBuilder("user")
    .where({ user_role: 0 })
    .orderBy("user.user_volume", "DESC")
    .limit(8)
    .getRawMany();
  const result = topsellers.map(function (x) {
    return {
      userSeq: x.user_user_seq,
      userNickname: x.user_user_nickname,
      userImage: x.user_user_profile_image,
      userVolume: x.user_user_volume,
    };
  });
  return result;
}

export default { nftHeart, getTopSellers } as const;
