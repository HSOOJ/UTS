import { Nft } from "@models/nft-model";
import { getConnection } from "typeorm";

function checkNftSeq(nftSeq: number) {
  const nftRepository = getConnection().getRepository(Nft);
  return nftRepository.findOne({
    where: {
      nft_seq: nftSeq,
    },
  });
}
export default {
  checkNftSeq,
} as const;
