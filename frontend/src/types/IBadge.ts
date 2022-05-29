import { BigNumber } from "ethers";

export interface IBadge {
  badgeId: BigNumber;
  owner: string;
  price: BigNumber;
  seller: string;
  sold: boolean;
}

export interface Meta {
  editionImageUrl: string;
  editionName: string;
  editionDescription: string;
}
