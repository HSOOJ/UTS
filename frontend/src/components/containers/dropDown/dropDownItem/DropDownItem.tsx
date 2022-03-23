import { LayOut, LayOutVariants } from "./DropDownItem.styled";
import { IDropDownItem } from "./DropDownItem.types";

const DropDownItem = ({ isDark, children }: IDropDownItem) => {
  return (
    <LayOut isDark={isDark} variants={LayOutVariants} whileHover="hover">
      {children}
    </LayOut>
  );
};

export default DropDownItem;
