// import marketRepo from "@repos/market-repo";
import { Artist } from "@models/Artist";
import { Common_code } from "@models/common_code-model";
import { Heart } from "@models/heart-model";
import { Nft } from "@models/nft-model";
import { Sale } from "@models/sale-model";
import { User } from "@models/user-model";
// import { common_code } from "@models/common_code";
// import { UserNotFoundError } from '@shared/errors';
// import logger from "jet-logger";
import { getConnection } from "typeorm";

// const sortbyList: String[] = ["latest","count","volume","artist_followers_total"];

/**
 * Get artists by sortby and category.
 *
 * @returns
 */
function getArtists(
  sortby: number,
  category: number
): Promise<Artist[] | null> {
  // logger.info(marketRepo.getArtists(sortby, category));
  // return marketRepo.getArtists(sortby, category);
  const connection = getConnection();
  const artistRepository = connection.getRepository(Artist);
  // const commonCodeRepository = connection.getRepository(common_code);

  // let code: number;
  // commonCodeRepository
  // .findOne({
  // where: {
  // code: category,
  // },
  // })
  // .then((result) => {
  // logger.info(result);
  // });

  if (category == 0) {
    return artistRepository.find({
      order: {
        artist_followers_total: "DESC",
      },
    });
  }

  switch (sortby) {
    case 1:
      // latest
      break;
    case 2:
      // count
      break;
    case 3:
      // volume
      break;
    case 4:
      return artistRepository.find({
        where: {
          code_seq: category,
        },
        order: {
          artist_followers_total: "DESC",
        },
      });
      break;
  }

  return artistRepository.find({
    where: {
      code_seq: category,
    },
    order: {
      artist_followers_total: "DESC",
    },
  });
  // return artistRepository.findOneById(1);
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
