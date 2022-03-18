import { atom } from "recoil";

interface userTypes {
  login: boolean;
  signUp: boolean;
  findId: boolean;
  findPw: boolean;
}

export const userState = atom<userTypes>({
  key: "userState",
  default: {
    login: false,
    signUp: false,
    findId: false,
    findPw: false,
  },
});
