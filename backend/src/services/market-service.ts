import { Artist } from "@models/Artist";
import { Common_code } from "@models/common_code-model";
import { Edition } from "@models/edition-model";
import { Heart } from "@models/heart-model";
import { Nft } from "@models/nft-model";
import { Sale } from "@models/sale-model";
import { getConnection } from "typeorm";

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(
  sortby: number,
  category: number
): Promise<Artist[] | null> {
  const connection = getConnection();
  const artistRepository = connection.getRepository(Artist);

  const baseQuery = artistRepository
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
    );

  // let categoryString;

  // switch (category) {
  // case 0:
  // categoryString = "";
  // break;
  // case 1:
  // categoryString = "뮤지션";
  // break;
  // case 2:
  // categoryString = "작가";
  // break;
  // case 3:
  // categoryString = "운동선수";
  // break;
  // case 4:
  // categoryString = "배우";
  // break;
  // case 5:
  // categoryString = "패션";
  // break;
  // case 6:
  // categoryString = "크리에이터";
  // break;
  // default:
  // categoryString = "기타";
  // break;
  // }

  if (category != 0) baseQuery.where(`artist.code_seq = ${category}`);

  let sortbyString;

  switch (sortby) {
    case 2:
      sortbyString = "artist_txs";
      break;
    case 3:
      sortbyString = "artist_sum";
      break;
    case 4:
      sortbyString = "artist_artist_followers_total";
      break;
    default:
      sortbyString = "artist_reg_dt";
      break;
  }

  return baseQuery.orderBy(`${sortbyString}`).getRawMany();
}

async function joinCode(sortby: number) {
  const res = await getConnection()
    .getRepository(Nft)
    .createQueryBuilder("nft")
    .leftJoinAndSelect(
      Artist,
      "artist",
      "artist.artist_seq = nft.nft_author_seq"
    )
    .leftJoinAndSelect(Common_code, "code", "code.code_seq = artist.code_seq")
    .leftJoinAndSelect(Sale, "sale", "sale.nft_seq = nft.nft_seq");

  if (sortby == 0) {
    return res
      .orderBy("sale.sale_price", "ASC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  } else if (sortby == 1) {
    return res
      .orderBy("sale.sale_price", "DESC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  } else if (sortby == 3) {
    return res.orderBy("sale.reg_dt", "DESC").getRawMany();
  } else {
    return res
      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(heart.heart_seq)", "count")
          .from(Heart, "heart")
          .where("heart.nft_seq = nft.nft_seq");
      }, "count")
      .orderBy("count", "DESC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  }
}

async function joinCodeCategory(category: number, sortby: number) {
  let categoryCode = "";
  switch (category) {
    case 1:
      categoryCode = "뮤지션";
      break;
    case 2:
      categoryCode = "작가";
      break;
    case 3:
      categoryCode = "운동선수";
      break;
    case 4:
      categoryCode = "배우";
      break;
    case 5:
      categoryCode = "패션";
      break;
    case 6:
      categoryCode = "크리에이터";
      break;
    case 7:
      categoryCode = "기타";
      break;
  }

  const res = await getConnection()
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("code.code_seq")
        .from(Common_code, "code")
        .where(`code.code = "${categoryCode}"`);
      return "artist.code_seq in " + subQuery.getQuery();
    })
    .withDeleted()
    .leftJoinAndSelect(Nft, "nft", "nft.nft_author_seq = artist.artist_seq")
    .leftJoinAndSelect(Sale, "sale", "sale.nft_seq = nft.nft_seq");

  console.log("1");
  if (sortby == 0) {
    return res
      .orderBy("sale.sale_price", "ASC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  } else if (sortby == 1) {
    return res
      .orderBy("sale.sale_price", "DESC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  } else if (sortby == 3) {
    return res.orderBy("sale.reg_dt", "DESC").getRawMany();
  } else {
    return res
      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(heart.heart_seq)", "count")
          .from(Heart, "heart")
          .where("heart.nft_seq = nft.nft_seq");
      }, "count")
      .orderBy("count", "DESC")
      .addOrderBy("sale.reg_dt", "DESC")
      .getRawMany();
  }
}

// Export default
export default {
  getArtists,
  // getAll,
  // addOne,
  // updateOne,
  // delete: deleteOne,
  joinCode,
  joinCodeCategory,
} as const;
