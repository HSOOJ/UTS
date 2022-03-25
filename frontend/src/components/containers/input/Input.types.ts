import { ThemeType } from "../../../global/theme";
import { IForm } from "../../../types/IForm";

type InputTypes = {
  type: "search" | "text" | "number";
  placeholder?: string;
  label?: string;
};

export interface IInput extends ThemeType, InputTypes, IForm {}
