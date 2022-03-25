import { ThemeType } from "../../../../global/theme";

export type Menu = {
  title: string;
  menuItems: string[];
};

type ControllerType = {
  header?: string;
  menuList?: Menu[];
};

export interface IController extends ControllerType, ThemeType {}
