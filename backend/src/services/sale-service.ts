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

export default {
  checkIsOnSale,
} as const;
