import { Nft } from "@models/nft-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Nft)
export class nftRepository extends Repository<Nft> {}
