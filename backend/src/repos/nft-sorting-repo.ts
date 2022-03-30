import { NftSorting } from "@models/nft-sorting-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(NftSorting)
export class nftSortingRepository extends Repository<NftSorting> {}
