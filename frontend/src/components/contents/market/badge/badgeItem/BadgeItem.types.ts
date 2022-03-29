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
  id: string;
  badgeImgSrc: string;
  artistSrc: string;
  name: string;
  category: string;
  liked: boolean;
  like: number;
  price: number;
  edition: EditionDataType;
  owner: OwnerDataType;
}

export interface IBadgeItem extends IBadgeItemData, IReactNode {}
