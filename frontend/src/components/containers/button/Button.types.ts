import { IReactNode } from "../../../types/IReactNode";

type ButtonTypes = {
  onClick: () => void;
  styleVariant: "primary" | "secondary";
};

export interface IButton extends IReactNode, ButtonTypes {}
