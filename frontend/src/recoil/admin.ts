import { atom } from "recoil";

interface adminTypes {
  manageUser: boolean;
  userNickname: string;
  userRole: number;
  reportUserList: [];
}

export const adminState = atom<adminTypes>({
  key: "adminState",
  default: {
    manageUser: true,
    userNickname: "",
    userRole: 0,
    reportUserList: [],
  },
});
