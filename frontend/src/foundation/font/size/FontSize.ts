import { FontSizePropNames, FontSizeType } from "./FontSize.types";

const FontSize: FontSizeType = {
  h1: 26,
  h2: 22,
  h3: 18,
  body1: 15,
  body2: 13,
} as const;

export const FontSizeKeys: FontSizePropNames[] = Object.keys(FontSize).map(
  (size) => size as FontSizePropNames
);

export default FontSize;
