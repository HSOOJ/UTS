import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { IDisable } from "./IDisabled";

export interface IRegister {
  register?: UseFormRegisterReturn;
}

export interface FormType extends IDisable {
  errMessage?: string;
}

export interface IForm extends FormType, IRegister {}
