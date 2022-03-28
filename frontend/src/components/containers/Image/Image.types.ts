import { ThemeType } from "../../../global/theme";

type ImageType = {
  src: string;
  shape?: "box" | "round";
  width?: string;
  height?: string;
  blurDeg?: number;
  borderSize?: number;
  borderColor?: string;
};

export interface IImage extends ImageType {}
