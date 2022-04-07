import { atom } from "recoil";

interface badgeDetailTypes {
  isOpenWalletAddressModal: boolean;
  isOpenBuyModal: boolean;
  isOpenSellModal: boolean;
  tokenURIState: string;
  tokenURIKeyState: string;
  getURIState: string;
  tokenDescription: string;
}

export const badgeDetailState = atom<badgeDetailTypes>({
  key: "badgeDetailState",
  default: {
    isOpenWalletAddressModal: false,
    isOpenBuyModal: false,
    isOpenSellModal: false,
    tokenURIState: "",
    tokenURIKeyState: "",
    getURIState: "",
    tokenDescription: "",
  },
});
