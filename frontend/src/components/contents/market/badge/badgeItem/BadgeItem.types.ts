import { IReactNode } from "../../../../../types/IReactNode";

export type OwnerDataType = {
  ownerId: string;
  profileSrc: string;
};

export type EditionDataType = {
  number: number;
  totalNumber: number;
};

interface IBadgeItemData {
  nftSeq: string;
  editionImage: string;
  nftAuthorImage: string;
  editionName: string;
  category: string;
  liked: boolean;
  like: number;
  nftPrice: number;
  edition: EditionDataType;
  owner: OwnerDataType;
  nftNum: number;
  total: number;
  nftOwnerSeq: string;
  nftOwnerImage: string;
}

export interface IBadgeItem extends IBadgeItemData, IReactNode {}
