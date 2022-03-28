<<<<<<< HEAD
import { Edition } from "@models/edition-model";
import { Nft } from "@models/nft-model";
import { getConnection } from "typeorm";

function mintingcheck() {
  const connection = getConnection();
  const nftRepository = connection.getRepository(Nft);

  return 1;
}

function mintingNft(
  editionSeq: number,
  editionName: string,
  editionImage: string,
  editionDescription: string,
  editionRoyalty: number
) {
  const connection = getConnection();
  const nftRepository = connection.getRepository(Nft);
  const editionRepository = connection.getRepository(Edition);
  const nowDate = new Date();

  const newEdition = editionRepository.insert({
    edition_seq: editionSeq,
    // artist_seq: artistSeq,
    edition_name: editionName,
    edition_image: editionImage,
    edition_description: editionDescription,
    edition_royalty: editionRoyalty,
    reg_dt: nowDate,
  });
  return 1;
}
export default { mintingcheck, mintingNft } as const;
=======
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
>>>>>>> a22bffb00971d27be2d945b509287b546dacc9fa
