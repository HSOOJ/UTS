import { atom } from "recoil";

interface profileType {
  userNickname: string;
  modalLoading: boolean;
  modalVisible: boolean;
  modifyNickname: string;
  nftBadgeList: boolean;
  tradeList: boolean;
  followList: boolean;
  ownList: boolean;
  sellingList: boolean;
  likeList: boolean;
}

export const profileState = atom<profileType>({
  key: "profileState",
  default: {
    userNickname: "",
    nftBadgeList: true,
    tradeList: false,
    followList: false,
    ownList: true,
    sellingList: false,
    likeList: false,
    modalLoading: false,
    modalVisible: false,
    modifyNickname: "",
  },
});
