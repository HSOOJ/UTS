import { Artist } from "@models/Artist";
import { Edition } from "@models/edition-model";
import { Heart } from "@models/heart-model";
import { Nft } from "@models/nft-model";
import { Sale } from "@models/sale-model";
import { User } from "@models/user-model";
import { Code, getConnection } from "typeorm";
import heartService from "./heart-service";
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
  const userRepository = getConnection().getRepository(User);
  const checkUser = await userService.checkUserSeq(ownerSeq);
  const checkNft = await returnNft(nftSeq);
  const checkIsOnSale = await saleService.checkIsOnSale(nftSeq);
  const curOwner = checkNft?.nft_owner_seq;
  const curCount = checkNft?.nft_transaction_count;
  const curVolume = checkNft?.nft_volume;
  const ownerUserInfo = await userService.getUserInfo(ownerSeq);
  const curUserInfo = await userService.getUserInfo(Number(curOwner));

  if (checkIsOnSale === null) {
    console.log("판매 중인 NFT가 아님");
    return 0;
  } else {
    if (checkNft !== null) {
      if (curOwner === ownerSeq) {
        console.log("현재 소유자와 동일한 회원");
        return 0;
      } else if (checkUser !== null) {
        await userRepository.update(
          { user_seq: ownerSeq },
          {
            user_volume:
              Number(ownerUserInfo?.user_volume) + checkIsOnSale.sale_price,
          }
        );
        await userRepository.update(
          { user_seq: curOwner },
          {
            user_volume:
              Number(curUserInfo?.user_volume) + checkIsOnSale.sale_price,
          }
        );
        await nftRepository.update(
          {
            nft_seq: nftSeq,
          },
          {
            nft_owner_seq: ownerSeq,
            nft_transaction_count: Number(curCount) + 1,
            mod_dt: nowDate,
            nft_volume: Number(curVolume) + checkIsOnSale.sale_price,
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
  salePrice: number,
  nftId: string,
  nftTransactionId: string
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
  // const nftsortingRepository = connection.getRepository(NftSorting);

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
        nft_id: nftId,
        nft_transaction_id: nftTransactionId,
        nft_transaction_count: 1,
        nft_volume: 0,
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

class ownNft {
  editionImage: string;
  editionName: string;
  artistNickname: string;
  nftNum: number;
  nftSeq: number;
  likes?: number;

  constructor(
    editionImage: string,
    editionName: string,
    artistNickname: string,
    nftNum: number,
    nftSeq: number,
    likes?: number
  ) {
    this.editionImage = editionImage;
    this.editionName = editionName;
    this.artistNickname = artistNickname;
    this.nftNum = nftNum;
    this.nftSeq = nftSeq;
    this.likes = likes;
  }
}

// 보유하고 있는 NFT의 전체 정보
async function getOwnNft(userSeq: number) {
  const result = await getConnection()
    .getRepository(Nft)
    .createQueryBuilder("nft")
    .leftJoinAndSelect(
      Edition,
      "edition",
      "edition.edition_seq = nft.edition_seq"
    )
    .leftJoinAndSelect(User, "user", "user.user_seq = nft.nft_author_seq")
    .where(`nft.nft_owner_seq = ${userSeq}`)
    .getRawMany();

  return result;
}

// 보유하고 있는 NFT 정보 중에서 리턴할 값
async function returnOwnNft(userSeq: number) {
  const result = await getOwnNft(userSeq);
  let res = new Array();
  for (let i = 0; i < result.length; i++) {
    const cur = result[i];

    res.push(
      new ownNft(
        cur.edition_edition_image,
        cur.edition_edition_name,
        cur.user_user_nickname,
        cur.nft_nft_num,
        cur.nft_nft_seq
      )
    );
  }
  // console.log(res);
  return res;
}

// 판매중인 NFT 정보 중에서 리턴할 값
async function returnSaleNft(userSeq: number) {
  const result = await getOwnNft(userSeq);
  let res = new Array();
  for (let i = 0; i < result.length; i++) {
    const cur = result[i];
    const onsale = await saleService.checkIsOnSale(cur.nft_nft_seq);

    if (onsale != null) {
      res.push(
        new ownNft(
          cur.edition_edition_image,
          cur.edition_edition_name,
          cur.user_user_nickname,
          cur.nft_nft_num,
          cur.nft_nft_seq
        )
      );
    }
  }
  // console.log(res);
  return res;
}

// 좋아요한 NFT의 전체 정보
async function getHeartNft(userSeq: number) {
  const result = await getConnection()
    .getRepository(Nft)
    .createQueryBuilder("nft")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("heart.nft_seq")
        .from(Heart, "heart")
        .where(`heart.user_seq = ${userSeq}`);
      return "nft.nft_seq in " + subQuery.getQuery();
    })
    .leftJoinAndSelect(
      Edition,
      "edition",
      "edition.edition_seq = nft.edition_seq"
    )
    .leftJoinAndSelect(User, "user", "user.user_seq = nft.nft_author_seq")
    .getRawMany();
  return result;
}

// 좋아요한 NFT의 정보 중에서 리턴할 값
async function returnHeartNft(userSeq: number) {
  const result = await getHeartNft(userSeq);
  let res = new Array();
  for (let i = 0; i < result.length; i++) {
    const cur = result[i];
    const heartCount = await heartService.countHeart(cur.nft_nft_seq);
    const heart = Number(<{ heart: string }>heartCount.heart);
    res.push(
      new ownNft(
        cur.edition_edition_image,
        cur.edition_edition_name,
        cur.user_user_nickname,
        cur.nft_nft_num,
        cur.nft_nft_seq,
        heart
      )
    );
  }
  return res;
}

async function returnNFTOwner(editionSeq: number) {
  const res = await getConnection()
    .getRepository(Nft)
    .createQueryBuilder("nft")
    .leftJoinAndSelect(User, "user", "user.user_seq = nft.nft_owner_seq")
    .where(`nft.edition_seq = ${editionSeq}`)
    .getRawMany();

  return res;
}

export default {
  getOwnNft,
  getHeartNft,
  returnNft,
  returnOwnNft,
  returnSaleNft,
  updateOwner,
  editionMinting,
  returnHeartNft,
  returnNFTOwner,
} as const;
