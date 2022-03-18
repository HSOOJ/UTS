import { atom } from "recoil";

interface userTypes {
  login: boolean;
  loginForm: boolean;
  signUp: boolean;
  findId: boolean;
  findPw: boolean;
}

export const userState = atom<userTypes>({
  key: "userState",
  default: {
    login: false,
    loginForm: true,
    signUp: false,
    findId: false,
    findPw: false,
  },
});
