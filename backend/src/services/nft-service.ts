import { Nft } from "@models/nft-model";
import { getConnection } from "typeorm";
import saleService from "./sale-service";
import userService from "./user-service";

const nowDate = new Date();

function returnNft(nftSeq: number) {
  console.log("PROCEEDING return nft...");

  const nftRepository = getConnection().getRepository(Nft);
  return nftRepository.findOne({
    where: {
      nft_seq: nftSeq,
    },
  });
}

// nft 소유자 변경
async function updateOwner(ownerSeq: number, nftSeq: number) {
  console.log("PROCEEDING update nft owner...");

  const nftRepository = getConnection().getRepository(Nft);
  const checkUser = await userService.checkUserSeq(ownerSeq);
  const checkNft = await returnNft(nftSeq);
  const checkIsOnSale = await saleService.checkIsOnSale(nftSeq);
  const curOwner = checkNft?.nft_owner_seq;

  if (checkIsOnSale === null) {
    console.log("판매 중인 NFT가 아님");
    return 0;
  } else {
    if (checkNft !== null) {
      if (curOwner === ownerSeq) {
        console.log("현재 소유자와 동일한 회원");
        return 0;
      } else if (checkUser !== null) {
        await nftRepository.update(
          {
            nft_seq: nftSeq,
          },
          {
            nft_owner_seq: ownerSeq,
            mod_dt: nowDate,
          }
        );
        console.log("소유자 변경 성공");
        return checkIsOnSale.sale_price;
      }
    } else {
      console.log("유효한 NFT가 아님");
      return 0;
    }
  }
}
export default {
  returnNft,
  updateOwner,
} as const;
