import { IReactNode } from "../../../../../types/IReactNode";

export type ArtistItemBadgeType = {
  tokenSrc: string;
  tokenName: string;
  price: number;
};

interface IArtistItemData {
  artist_artist_seq: string;
  user_user_profile_image: string;
  user_user_nickname: string;
  category: string;
  artist_artist_followers_total: number;
  user_user_volume: number;
  artist_max: number;
  artist_txs: number;
  newest_edition_image: string;
  newest_edition_name: string;
  latest_volume: number;
  bestSeller_edition_image: string;
  bestSeller_edition_name: string;
  volume: number;
  bestSellers: ArtistItemBadgeType;
  newestDrops: ArtistItemBadgeType;
  // id: string;
  // backgroundSrc: string;
  // profileSrc: string;
  // name: string;
  // category: string;
  // followers: number;
  // volume: number;
  // highest: number;
  // transActions: number;
  // bestSellers: ArtistItemBadgeType;
  // newestDrops: ArtistItemBadgeType;
}

export interface IArtistItem extends IArtistItemData, IReactNode {}
