import { atom } from "recoil";

interface artistDetailTypes {
  followArtist: boolean;
  isOpenWalletAddressModal: boolean;
  artistEditionList: [];
  description: string;
  category: string;
  artistSns: string;
  artistFollowersTotal: string;
  userNickname: string;
  walletAddress: string;
  artistId: string;
  userId: string;
}

export const artistDetailState = atom<artistDetailTypes>({
  key: "artistDetailState",
  default: {
    followArtist: false,
    isOpenWalletAddressModal: false,
    artistEditionList: [],
    description: "",
    category: "",
    artistSns: "",
    artistFollowersTotal: "",
    userNickname: "",
    walletAddress: "",
    artistId: "",
    userId: "",
  },
});
