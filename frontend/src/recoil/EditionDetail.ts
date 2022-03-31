import { atom } from "recoil";

interface EditionDetailTypes {
  isLike: boolean;
  isOpenWalletAddressModal: boolean;
  isOpenBuyModal: boolean;
  artist_seq: string;
  edition_description: string;
  edition_image: string;
  edition_name: string;
  edition_seq: string;
}

export const editionDetailState = atom<EditionDetailTypes>({
  key: "editionDetailState",
  default: {
    isLike: false,
    isOpenWalletAddressModal: false,
    isOpenBuyModal: false,
    artist_seq: "",
    edition_description: "",
    edition_image: "",
    edition_name: "",
    edition_seq: "",
  },
});
