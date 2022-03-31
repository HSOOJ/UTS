import { Dispatch, SetStateAction } from "react";
import { ThemeType } from "../../../global/theme";

export interface ISwitch extends ThemeType {
  isChecked?: boolean;
  onToggle?: Dispatch<SetStateAction<boolean>>;
}
