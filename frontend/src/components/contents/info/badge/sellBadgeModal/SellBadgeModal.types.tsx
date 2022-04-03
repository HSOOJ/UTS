import { FieldError } from "react-hook-form";

export interface ISellBadge {
  salePrice: number;
}

export interface ISellBE extends ISellBadge {}

export interface ISellErrors {
  salePrice?: FieldError | undefined;
}
