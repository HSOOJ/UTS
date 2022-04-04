import { Artist } from "@models/Artist";
import { Edition } from "@models/edition-model";
import { Report } from "@models/report-model";
import { Sale } from "@models/sale-model";

import { getConnection } from "typeorm";

function getAllbyPopular(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_artist_followers_total", "DESC")
    .limit(13);

  return result.getRawMany();
}

function getAllbyLatest(): Promise<Artist[] | null> {
  const connection = getConnection();

  const result = connection
    .getRepository(Artist)
    .createQueryBuilder("artist")
    .innerJoinAndSelect("artist.user", "user")
    .orderBy("artist_reg_dt", "DESC")
    .limit(13);

  return result.getRawMany();
}

async function getArtistInfo(
  artistSeq: number
): Promise<Artist | null | undefined> {
  const connection = getConnection();

  const baseQuery = connection
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
    .where(`artist.artist_seq = ${artistSeq}`);

  return baseQuery.getRawOne();
}

async function getEditions(artistSeq: number): Promise<Edition[] | null> {
  const connection = getConnection();

  const baseQuery = connection
    .getRepository(Edition)
    .createQueryBuilder("edition")
    .innerJoinAndSelect(
      (qb) =>
        qb
          .select("min(sale.sale_price)", "min_price")
          .addSelect("edition.edition_seq", "edition_seq")
          .from(Sale, "sale")
          .addFrom(Edition, "edition")
          .groupBy("edition_seq")
          .where(
            "edition_seq = (select nft.edition_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere(`edition.artist_seq = ${artistSeq}`),
      "min",
      ""
    )
    .innerJoinAndSelect(
      (qb) =>
        qb
          .select("count(*)", "on_sale")
          .addSelect("edition.edition_seq", "edition_seq")
          .from(Sale, "sale")
          .addFrom(Edition, "edition")
          .groupBy("edition_seq")
          .where(
            "edition_seq = (select nft.edition_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere(`edition.artist_seq = ${artistSeq}`),
      "on_sale",
      ""
    )
    .innerJoinAndSelect(
      (qb) =>
        qb
          .select("count(*)", "all_count")
          .addSelect("edition.edition_seq", "edition_seq")
          .from(Sale, "sale")
          .withDeleted()
          .addFrom(Edition, "edition")
          .groupBy("edition_seq")
          .where(
            "edition_seq = (select nft.edition_seq from nft nft where nft.nft_seq = sale.nft_seq)"
          )
          .andWhere(`edition.artist_seq = ${artistSeq}`),
      "all",
      ""
    )
    .where(`edition.artist_seq = ${artistSeq}`);

  return baseQuery.getRawMany();
}

async function report(userSeq: number, artistSeq: number) {
  const nowDate = new Date();
  const connection = getConnection();
  return connection.getRepository(Report).save({
    user_seq: userSeq,
    artist_seq: artistSeq,
    reg_dt: nowDate,
    mod_dt: nowDate,
  });
}

// async function name(params:type) {

// }
// Export default
export default {
  getAllbyPopular,
  getAllbyLatest,
  getArtistInfo,
  getEditions,
  report,
} as const;
