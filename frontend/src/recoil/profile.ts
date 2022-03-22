import { atom } from "recoil";

interface profileType {
  userNickname: string;
  modifyModal: boolean;
  modifyModalNickname: boolean;
  modifyModalDelete: boolean;
  nftBadgeList: boolean;
  tradeList: boolean;
  followList: boolean;
}

export const profileState = atom<profileType>({
  key: "profileState",
  default: {
    userNickname: "",
    modifyModal: false,
    modifyModalNickname: false,
    modifyModalDelete: false,
    nftBadgeList: true,
    tradeList: false,
    followList: false,
  },
});
