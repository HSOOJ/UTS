import { atom } from "recoil";

interface adminTypes {
  manageUser: boolean;
}

export const adminState = atom<adminTypes>({
  key: "adminState",
  default: {
    manageUser: true,
  },
});
