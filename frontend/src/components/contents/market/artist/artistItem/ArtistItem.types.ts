import { IReactNode } from "../../../../../types/IReactNode";

export type ArtistItemBadgeType = {
  tokenSrc: string;
  tokenName: string;
  price: number;
};

interface IArtistItemData {
  id: string;
  backgroundSrc: string;
  profileSrc: string;
  name: string;
  category: string;
  followers: number;
  volume: number;
  highest: number;
  transActions: number;
  bestSellers: ArtistItemBadgeType;
  newestDrops: ArtistItemBadgeType;
}

export interface IArtistItem extends IArtistItemData, IReactNode {}
