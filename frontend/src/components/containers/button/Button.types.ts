import { ThemeType } from "../../../global/theme";
import { IReactNode } from "../../../types/IReactNode";

type ButtonTypes = {
  onClick?: () => void;
  styleVariant: "primary" | "secondary" | "secondaryWeak";
};

export interface IButton extends IReactNode, ButtonTypes {}
