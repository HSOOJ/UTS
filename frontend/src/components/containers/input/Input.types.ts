import { ThemeType } from "../../../global/theme";
import { FormType, IForm } from "../../../types/IForm";

type InputTypes = {
  type: "search" | "text";
  placeholder?: string;
  label?: string;
};

export interface IInput extends ThemeType, InputTypes, IForm {}
