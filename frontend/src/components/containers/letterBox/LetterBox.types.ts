import { FontColorPropNames } from "../../../foundation/font/color/FontColor.types";
import { FontSizePropNames } from "../../../foundation/font/size/FontSize.types";
import { FontWeightPropNames } from "../../../foundation/font/weight/FontWeight.types";
import { IReactNode } from "../../../types/IReactNode";

type LetterBoxProps = {
  size?: FontSizePropNames;
  color?: FontColorPropNames;
  weight?: FontWeightPropNames;
};

export default interface ILetterBox extends LetterBoxProps, IReactNode {}
