import { Sale } from "@models/sale-model";
import { getConnection } from "typeorm";
import nftService from "./nft-service";

async function checkIsOnSale(nftSeq: number) {
  const saleRepository = getConnection().getRepository(Sale);
  return saleRepository.findOne({
    where: {
      nft_seq: nftSeq,
    },
  });
}

async function sell(nftSeq: number, salePrice: number) {
  const checkSale = await checkIsOnSale(nftSeq);
  if (checkSale === null) {
    const saleRepository = getConnection().getRepository(Sale);
    const nowDate = new Date();

    saleRepository.insert({
      nft_seq: nftSeq,
      sale_price: salePrice,
      reg_dt: nowDate,
      mod_dt: nowDate,
    });
    console.log("판매 테이블 등록 완료");
    return 1;
  } else {
    console.log("이미 판매중인 NFT");
    return 0;
  }
}

async function deleteSale(nftSeq: number) {
  console.log("PROCEEDING delete sale...");

  const saleRepository = getConnection().getRepository(Sale);

  try {
    saleRepository
      .createQueryBuilder()
      .softDelete()
      .where({ nft_seq: nftSeq })
      .execute();
    console.log("sale 테이블 삭제 성공");
    return 1;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getTransactionCount(nftSeq: number) {
  const saleRepository = getConnection().getRepository(Sale);
  const res = saleRepository
    .createQueryBuilder()
    .select("count(nft_seq)", "transcation")
    .addSelect("sum(sale_price)", "total")
    .where({ nft_seq: nftSeq })
    .getRawOne();
  // console.log(res);
  return res;
}

async function latest(nftSeq: number) {
  const saleRepository = getConnection().getRepository(Sale);

  const res = await saleRepository
    .createQueryBuilder()
    .select("sale_price", "latest")
    .withDeleted()
    .andWhere({ nft_seq: nftSeq })
    .orderBy("mod_dt", "DESC")
    .getRawOne();
  return res;
}
async function getSalePrice(nftSeq: number) {
  const saleRepository = getConnection().getRepository(Sale);

  const res = await saleRepository
    .createQueryBuilder()
    .select("sale_price", "sale_price")
    .andWhere({ nft_seq: nftSeq })
    .orderBy("mod_dt", "DESC")
    .getRawOne();
  return res;
}

async function returnNft(nftSeq: number) {
  const saleRepository = getConnection().getRepository(Sale);

  const res = await saleRepository
    .createQueryBuilder()
    .select("sale_price", "latest")
    .addSelect("del_dt", "isSale")
    .withDeleted()
    .andWhere({ nft_seq: nftSeq })
    .orderBy("mod_dt", "DESC")
    .getRawOne();
  return res;
}

export default {
  getSalePrice,
  getTransactionCount,
  latest,
  checkIsOnSale,
  sell,
  deleteSale,
  returnNft,
} as const;
