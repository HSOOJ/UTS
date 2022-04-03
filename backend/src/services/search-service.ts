// import marketRepo from "@repos/market-repo";
import { User } from "@models/user-model";
import { Artist } from "@models/Artist";
// import { common_code } from "@models/common_code";
// import { UserNotFoundError } from '@shared/errors';
import { getConnection } from "typeorm";
import { Nft } from "@models/nft-model";
import { Sale } from "@models/sale-model";
import { Edition } from "@models/edition-model";
import userService from "./user-service";
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
    .innerJoinAndSelect("artist.user", "user")
    .leftJoinAndSelect(
      (qb) =>
        qb
          .select("sum(sale.sale_price)", "artist_sum")
          .addSelect("artist2.artist_seq", "sum_all_artist_seq")
          .withDeleted()
          .from(Sale, "sale")
          .addFrom(Artist, "artist2")
          .groupBy("artist2.artist_seq")
          .where(
            // eslint-disable-next-line max-len
            "artist2.artist_seq = (select nft.nft_author_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere("sale.del_dt is not null"),
      "sum_all",
      "artist.artist_seq = sum_all.sum_all_artist_seq"
    )
    .leftJoinAndSelect(
      (qb) =>
        qb
          .select("max(sale.sale_price)", "artist_max")
          .addSelect("artist2.artist_seq", "max_artist_seq")
          .withDeleted()
          .from(Sale, "sale")
          .addFrom(Artist, "artist2")
          .groupBy("artist2.artist_seq")
          .where(
            // eslint-disable-next-line max-len
            "artist2.artist_seq = (select nft.nft_author_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere("sale.del_dt is not null"),
      "max",
      "artist.artist_seq = max.max_artist_seq"
    )
    .leftJoinAndSelect(
      (qb) =>
        qb
          .select("count(*)", "artist_txs")
          .addSelect("artist2.artist_seq", "txs_artist_seq")
          .withDeleted()
          .from(Sale, "sale")
          .addFrom(Artist, "artist2")
          .groupBy("artist2.artist_seq")
          .where(
            // eslint-disable-next-line max-len
            "artist2.artist_seq = (select nft.nft_author_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere("sale.del_dt is not null"),
      "txs",
      "artist.artist_seq = txs.txs_artist_seq"
    )
    .leftJoinAndSelect(
      (qb) =>
        qb
          .select("sum(temp.tsum)", "volume")
          .addSelect("temp.nft_edition_seq", "volume_edition_seq")
          .from(
            (qb) =>
              qb
                .select("sum(sale.sale_price)", "tsum")
                .addSelect("sale.nft_seq")
                .addSelect("nft.edition_seq")
                .withDeleted()
                .from(Nft, "nft")
                .addFrom(Sale, "sale")
                .where("sale.nft_seq = nft.nft_seq")
                .andWhere("sale.del_dt is not null")
                .groupBy("nft_seq"),
            "temp"
          )
          .groupBy("volume_edition_seq")
          .orderBy("volume")
          .limit(1),
      "sum_volume", // AS
      // eslint-disable-next-line max-len
      "artist.artist_seq = (select edition.artist_seq from edition where edition.edition_seq = sum_volume.volume_edition_seq)" // ON
    )
    .leftJoinAndSelect(
      Edition,
      "bestSeller",
      "bestSeller.edition_seq = volume_edition_seq"
    )
    .leftJoinAndSelect(
      (qb) =>
        qb
          .select("sum(temp.tsum)", "latest_volume")
          .addSelect("temp.nft_edition_seq", "latest_edition_seq")
          .addSelect("edition.reg_dt", "edition_reg_dt")
          .from(Edition, "edition")
          .addFrom(
            (qb) =>
              qb
                .select("sum(sale.sale_price)", "tsum")
                .addSelect("sale.nft_seq")
                .addSelect("nft.edition_seq")
                .withDeleted()
                .from(Nft, "nft")
                .addFrom(Sale, "sale")
                .where("sale.nft_seq = nft.nft_seq")
                .andWhere("sale.del_dt is not null")
                .groupBy("nft_seq"),
            "temp"
          )
          .where("temp.nft_edition_seq = edition.edition_seq")
          .groupBy("latest_edition_seq")
          .orderBy("edition_reg_dt")
          .limit(1),
      "sum_latest", // AS
      // eslint-disable-next-line max-len
      "artist.artist_seq = (select edition.artist_seq from edition where edition.edition_seq = sum_latest.latest_edition_seq)" // ON
    )
    .leftJoinAndSelect(
      Edition,
      "newest",
      "newest.edition_seq = latest_edition_seq"
    )
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("user.user_seq")
        .from(User, "user")
        .where(`user.user_nickname Like '%${input}%'`);
      return "artist.user_seq in " + subQuery.getQuery();
    });

  return result.getRawMany();
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

async function searchNft(input: string) {
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
  searchNft,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
} as const;
