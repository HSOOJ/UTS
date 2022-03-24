import { IconNames } from "./assets/IconAsset.Types";
import { FontColorPropNames } from "../font/color/FontColor.types";
import { ThemeType } from "../../global/theme";

interface IconType {
  name: IconNames;
  size?: number;
  color?: FontColorPropNames;
}

export default interface IIcon extends IconType, ThemeType {}
