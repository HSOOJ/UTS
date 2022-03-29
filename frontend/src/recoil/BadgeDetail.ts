import { atom } from "recoil";

interface badgeDetailTypes {
  isLike: boolean;
}

export const badgeDetailState = atom<badgeDetailTypes>({
  key: "badgeDetailState",
  default: {
    isLike: false,
  },
});
