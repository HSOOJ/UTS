import { IconNames } from "./assets/IconAsset.Types";
import { FontColorPropNames } from "../font/color/FontColor.types";

interface IconType {
  name: IconNames;
  size?: number;
  color?: FontColorPropNames;
}

export default interface IIcon extends IconType {}
