import { atom } from "recoil";
import { ThemeType } from "../global/theme";
import { localStorageEffect } from "../utils/localStorage";

export const themeAtom = atom<ThemeType>({
  key: "themeState",
  default: { isDark: true },
  effects: [localStorageEffect("theme")],
});
