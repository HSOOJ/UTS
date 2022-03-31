import { ThemeType } from "../../../global/theme";
import { IForm } from "../../../types/IForm";

type TextAreaTypes = {
  type: "search" | "text" | "number";
  placeholder?: string;
  label?: string;
};

export interface ITextArea extends ThemeType, TextAreaTypes, IForm {}
