import { ThemeType } from "../../../global/theme";
import { IReactNode } from "../../../types/IReactNode";

export interface IBadge extends IReactNode, ThemeType {
  type: "like" | "report" | "verified";
  liked?: boolean;
  borderColor?: string;
}
