import { IDisable } from "./IDisabled";

type FormType = {
  hasError?: boolean;
  required?: boolean;
  readonly?: boolean;
};

export interface IForm extends FormType, IDisable {}
