import { useState } from "react";
import { ThemeType } from "../../../../global/theme";
import { toggle } from "../../../../utils/toggler";
import Button from "../../../containers/button";
import DropDown from "../../../containers/dropDown/DropDown";
import DropDownItem from "../../../containers/dropDown/dropDownItem/DropDownItem";
import { Menu } from "../controller/Controller.types";

export const ControllerMenu = ({
  isDark,
  menuItems,
  title,
}: Menu & ThemeType) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Button
        onClick={() => toggle(setShowMenu)}
        styleVariant={isDark ? "secondary" : "primary"}
      >
        {title}
      </Button>
      <DropDown isShowing={showMenu} isDark={isDark}>
        {menuItems.map((item) => (
          <DropDownItem isDark={isDark} key={item}>
            {item}
          </DropDownItem>
        ))}
      </DropDown>
    </>
  );
};
