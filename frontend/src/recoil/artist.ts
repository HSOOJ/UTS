import { atom } from "recoil";

interface artistType {
  artistSeq: string;
  artistUserSeq: string;
  following: boolean;
}

export const artistState = atom<artistType>({
  key: "artistState",
  default: {
    artistSeq: "",
    artistUserSeq: "",
    following: false,
  },
});
