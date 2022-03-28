import { Sale } from "@models/sale-model";
import { getConnection } from "typeorm";

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

export default {
  checkIsOnSale,
  sell,
} as const;
