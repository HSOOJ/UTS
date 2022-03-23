import Palette from "../../../../foundation/color/Palette";
import FontColor from "../../../../foundation/font/color/FontColor";
import LetterBox from "../../letterBox/LetterBox";
import { LayOut, LayOutVariants } from "./DropDownItem.styled";
import { IDropDownItem } from "./DropDownItem.types";

const DropDownItem = ({ children }: IDropDownItem) => {
  return (
    <LayOut variants={LayOutVariants} whileHover="hover">
      {children}
    </LayOut>
  );
};

export default DropDownItem;
