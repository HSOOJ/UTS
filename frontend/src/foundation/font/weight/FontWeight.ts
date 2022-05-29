import { FontWeightPropNames, FontWeightType } from "./FontWeight.types";

const FontWeight: FontWeightType = {
  extraBold: 700,
  bold: 500,
  regular: 400,
  thin: 200,
} as const;

export const FontWeightKeys: FontWeightPropNames[] = Object.keys(
  FontWeight
).map((size) => size as FontWeightPropNames);

export default FontWeight;
