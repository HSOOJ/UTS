import { LayOut } from "./DropDown.styled";
import { IDropDown } from "./DropDown.types";

const DropDown = ({ isDark, children }: IDropDown) => {
  return <LayOut isDark={isDark}>{children}</LayOut>;
};

export default DropDown;
