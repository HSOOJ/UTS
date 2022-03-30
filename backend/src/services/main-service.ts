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
    .leftJoinAndSelect("nft.editionSeq2", "nfts")
    .getRawMany();
  console.log(heartTotal);

  return heartTotal.slice(0, 12);
}

export default { nftHeart } as const;
