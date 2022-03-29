import { atom } from "recoil";

interface profileType {
  userNickname: string;
  modifyNickname: string;
  userWallet: string | undefined | null;
  userSeq: string | undefined | null;
  userProfileImage: string | undefined | null;
  clickProfile: boolean;
  modalLoading: boolean;
  modalVisible: boolean;
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
    modifyNickname: "",
    userWallet: localStorage.getItem("userAccount")?.replace(/\"/gi, ""),
    userSeq: localStorage.getItem("userSeq"),
    userProfileImage: "",
    clickProfile: false,
    modalLoading: false,
    modalVisible: false,
    nftBadgeList: true,
    tradeList: false,
    followList: false,
    ownList: true,
    sellingList: false,
    likeList: false,
  },
});
