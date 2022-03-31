import { atom } from "recoil";

interface artistDetailTypes {
  followArtist: boolean;
  isOpenWalletAddressModal: boolean;
}

export const artistDetailState = atom<artistDetailTypes>({
  key: "artistDetailState",
  default: {
    followArtist: false,
    isOpenWalletAddressModal: false,
  },
});
