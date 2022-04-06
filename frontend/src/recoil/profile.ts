import { atom } from "recoil";

interface profileType {
  userNickname: string;
  modifyNickname: string;
  modifyNicknameCheck: boolean;
  userWallet: string | undefined | null;
  userSeq: string | undefined | null;
  userProfileImage: string | undefined | null;
  modifyUserProfileImage: string | undefined | null;
  clickProfile: boolean;
  modalLoading: boolean;
  modalVisible: boolean;
  nftBadgeList: boolean;
  tradeList: boolean;
  followList: boolean;
  ownList: boolean;
  sellingList: boolean;
  likeList: boolean;
  ownData: [];
  sellingData: [];
  likeData: [];
}

export const profileState = atom<profileType>({
  key: "profileState",
  default: {
    userNickname: "",
    modifyNickname: "",
    modifyNicknameCheck: false,
    userWallet: localStorage.getItem("userAccount")?.replace(/\"/gi, ""),
    userSeq: localStorage.getItem("userSeq"),
    userProfileImage: localStorage.getItem("userProfileImage"),
    modifyUserProfileImage: "",
    clickProfile: false,
    modalLoading: false,
    modalVisible: false,
    nftBadgeList: true,
    tradeList: false,
    followList: false,
    ownList: true,
    sellingList: false,
    likeList: false,
    ownData: [],
    sellingData: [],
    likeData: [],
  },
});
