import { atom } from "recoil";

interface badgeDetailTypes {
  isOpenWalletAddressModal: boolean;
  isOpenBuyModal: boolean;
  isOpenSellModal: boolean;
}

export const badgeDetailState = atom<badgeDetailTypes>({
  key: "badgeDetailState",
  default: {
    isOpenWalletAddressModal: false,
    isOpenBuyModal: false,
    isOpenSellModal: false,
  },
});
