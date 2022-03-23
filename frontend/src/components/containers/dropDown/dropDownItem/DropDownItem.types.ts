import { IReactNode } from "../../../../types/IReactNode";

type DropDownItemTypes = {
  //   variant: "defualt" | "hovered";
};

export interface IDropDownItem extends IReactNode, DropDownItemTypes {}
