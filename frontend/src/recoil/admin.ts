import { atom } from "recoil";

interface adminTypes {
  manageUser: boolean;
  userNickname: string;
  userRole: number;
  userSeq: number;
  reportUserList: [];
  artistSeq: number;
  commonCode: string;
  commonCodeSeq: number;
  userWalletAddress: string;
}

export const adminState = atom<adminTypes>({
  key: "adminState",
  default: {
    manageUser: true,
    userNickname: "",
    userRole: 0,
    userSeq: 0,
    reportUserList: [],
    artistSeq: 0,
    commonCode: "",
    commonCodeSeq: 0,
    userWalletAddress: "",
  },
});
