import { atom } from "recoil";

interface badgeDetailTypes {
  isLike: boolean;
  isOpenWalletAddressModal: boolean;
  isOpenBuyModal: boolean;
}

export const badgeDetailState = atom<badgeDetailTypes>({
  key: "badgeDetailState",
  default: {
    isLike: false,
    isOpenWalletAddressModal: false,
    isOpenBuyModal: false,
  },
});
