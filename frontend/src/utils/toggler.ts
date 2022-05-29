import { SetStateAction } from "react";

export const toggle = (func: (value: SetStateAction<boolean>) => void) => {
  func((now) => !now);
};
