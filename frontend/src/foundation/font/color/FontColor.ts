import Palette from "../../color/Palette";
import { FontColorPropNames, FontColorType } from "./FontColor.types";

const FontColor: FontColorType = {
  light: Palette.Grigio100,
  shade: Palette.Grigio300,
  dark: Palette.Nero300,
  primary: Palette.Blu200,
  danger: Palette.Rosso100,
} as const;

export const FontColorKeys: FontColorPropNames[] = Object.keys(FontColor).map(
  (color) => color as FontColorPropNames
);

export default FontColor;
