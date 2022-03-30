// import marketRepo from "@repos/market-repo";
import { User } from "@models/user-model";
import { Artist } from "@models/Artist";
// import { common_code } from "@models/common_code";
// import { UserNotFoundError } from '@shared/errors';
import logger from "jet-logger";
import {
  getConnection,
  QueryResult,
  SimpleConsoleLogger,
  Unique,
} from "typeorm";
import { Nft } from "@models/nft-model";
import { Sale } from "@models/sale-model";
import { Edition } from "@models/edition-model";
import editionService from "./edition-service";
import userService from "./user-service";
import nftSortingService from "./nft-sorting-service";
import saleService from "./sale-service";
import heartService from "./heart-service";

// const sortbyList: String[] = ["latest","count","volume","artist_followers_total"];

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(input: string): Promise<Artist[] | null> {
  // logger.info(marketRepo.getArtists(sortby, category));
  // return marketRepo.getArtists(sortby, category);
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("user.user_seq")
        .from(User, "user")
        .where(`user.user_nickname Like '%${input}%'`);
      return "artist.user_seq in " + subQuery.getQuery();
    });

  return result.getMany();
}

class returnValue {
  editionSeq: number;
  editionImage: string;
  artistProfileImage: string;
  editionName: string;
  nftSeq: number;
  nftNum: number;
  nftPrice?: number;
  nftOwner: number;
  transactionCount: number;
  volume: number;
  latest: number;
  hearts: number;

  constructor(
    editionSeq: number,
    editionImage: string,
    artistProfileImage: string,
    editionName: string,
    nftSeq: number,
    nftNum: number,
    nftPrice: number,
    nftOwner: number,
    transactionCount: number,
    volume: number,
    latest: number,
    hearts: number
  ) {
    this.editionSeq = editionSeq;
    this.editionImage = editionImage;
    this.artistProfileImage = artistProfileImage;
    this.editionName = editionName;
    this.nftSeq = nftSeq;
    this.nftNum = nftNum;
    this.nftPrice = nftPrice;
    this.nftOwner = nftOwner;
    this.transactionCount = transactionCount;
    this.volume = volume;
    this.latest = latest;
    this.hearts = hearts;
  }
}

async function getAllNft(input: string) {
  const result = await getConnection()
    .getRepository(Nft)
    .createQueryBuilder("nft")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("edition.edition_seq")
        .from(Edition, "edition")
        .where(`edition.edition_name Like '%${input}%'`);
      return "nft.edition_seq in " + subQuery.getQuery();
    })
    .leftJoinAndSelect("nft.edition", "edition")
    .getRawMany();

  // console.log(result);

  return result;
}

async function name(input: string) {
  const result = await getAllNft(input);
  let res1 = new Array();
  for (let i: number = 0; i < result.length; i++) {
    const cur = result[i];
    let editionSeq = cur.edition_edition_seq;
    let userSeq = cur.edition_artist_seq;
    let editionImage = cur.edition_edition_image;
    let artistProfileImage = await userService.getUserProfileImage(userSeq);
    let editionName = cur.edition_edition_name;
    let nftSeq = cur.nft_nft_seq;
    let nftNum = cur.nft_nft_num;

    let tmp = await saleService.getSalePrice(nftSeq);
    let nftPrice = -1;
    if (tmp !== undefined) {
      nftPrice = Number((<{ sale_price: string }>tmp).sale_price);
    }
    let nftOwner = cur.nft_nft_owner_seq;

    let transactions = await saleService.getTransactionCount(nftSeq);
    const transactionCount = Number(
      (<{ transcation: string }>transactions).transcation
    );
    const volume = Number((<{ total: string }>transactions).total);
    const latestSale = await saleService.latest(nftSeq);
    let latest = -1;
    if (latestSale !== undefined) {
      latest = Number((<{ latest: string }>latestSale).latest);
    }

    let heartCount = await heartService.countHeart(nftSeq);
    let hearts = Number((<{ heart: number }>heartCount).heart);

    res1.push(
      new returnValue(
        editionSeq,
        editionImage,
        artistProfileImage,
        editionName,
        nftSeq,
        nftNum,
        nftPrice,
        nftOwner,
        transactionCount,
        volume,
        latest,
        hearts
      )
    );
  }

  return await res1;
}

// Export default
export default {
  getArtists,
  getAllNft,
  name,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
} as const;
