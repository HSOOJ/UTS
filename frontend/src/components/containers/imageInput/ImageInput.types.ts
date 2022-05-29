import { ThemeType } from "../../../global/theme";
import { IForm } from "../../../types/IForm";

export interface IImageInput extends IForm, ThemeType {
  title?: string;
  onChange: (...event: any[]) => void;
}
