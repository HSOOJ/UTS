import { AnimatePresence } from "framer-motion";
import { DropDownLayOutVariants, LayOut } from "./DropDown.styled";
import { IDropDown } from "./DropDown.types";

const DropDown = ({ isShowing, isDark, children }: IDropDown) => {
  return (
    <AnimatePresence>
      {isShowing ? (
        <LayOut
          variants={DropDownLayOutVariants}
          initial="entry"
          animate="presence"
          exit="out"
          isDark={isDark}
        >
          {children}
        </LayOut>
      ) : null}
    </AnimatePresence>
  );
};

export default DropDown;
