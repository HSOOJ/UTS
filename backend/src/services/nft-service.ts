import { Artist } from "@models/Artist";
import { Edition } from "@models/edition-model";
import { Nft } from "@models/nft-model";
import { User } from "@models/user-model";
import { Sale } from "@models/sale-model";
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

// nft 민팅 시 에디션 등록
async function editionMinting(
  userSeq: number,
  editionName: string,
  editionImage: string,
  editionDescription: string,
  editionRoyalty: number,
  editionTotal: number,
  salePrice: number
) {
  const connection = getConnection();
  const artistRepository = connection.getRepository(Artist);
  const artist = await artistRepository.findOne({
    relations: ["user"],
    where: {
      user_seq: userSeq,
    },
  });
  const editionRepository = connection.getRepository(Edition);
  const nftRepository = connection.getRepository(Nft);
  const userRepository = connection.getRepository(User);
  const saleRepository = connection.getRepository(Sale);

  const editionNameCheck = await editionRepository.findOne({
    where: {
      edition_name: editionName,
    },
  });

  const artistUser = await userRepository.findOne({
    where: {
      user_seq: userSeq,
    },
  });
  if (editionNameCheck) {
    console.log(editionNameCheck);
    console.log("same");
    return 0;
  }

  await editionRepository.insert({
    edition_name: editionName,
    edition_image: editionImage,
    edition_description: editionDescription,
    edition_royalty: editionRoyalty,
    reg_dt: nowDate,
    artist_seq: artist?.artist_seq,
  });
  const artistSequence = artist?.artist_seq;
  const artistTransactionId = artistUser?.user_wallet_address;

  if (artistSequence) {
    const editionSeq = await editionRepository.findOne({
      where: {
        edition_name: editionName,
      },
    });
    const editionSequence = editionSeq?.edition_seq;

    for (let idx = 1; idx <= editionTotal; idx++) {
      await nftRepository.insert({
        edition_seq: editionSequence,
        nft_author_seq: artistSequence,
        nft_owner_seq: artistSequence,
        nft_num: idx,
        reg_dt: nowDate,
        mod_dt: nowDate,
        nft_id: "",
        nft_transaction_id: artistTransactionId,
      });
      const nftSeq = await nftRepository.findOne({
        where: {
          edition_seq: editionSequence,
          nft_num: idx,
        },
      });
      await saleRepository.insert({
        sale_price: salePrice,
        nft_seq: nftSeq?.nft_seq,
        reg_dt: nowDate,
        mod_dt: nowDate,
      });
    }

    return 1;
  } else {
    return 0;
  }
}

// async function nftMinting(userSeq: number);
export default {
  returnNft,
  updateOwner,
  editionMinting,
} as const;
