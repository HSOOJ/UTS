import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import Input from "../../../containers/input";
import LetterBox from "../../../containers/letterBox/LetterBox";
import ControllerMenu from "../controllerMenu";
import { ControllerBox } from "./Controller.styled";
import { IController } from "./Controller.types";

const Controller = ({ isDark, header = "헤더", menuList }: IController) => {
  const theme = useRecoilValue(themeAtom);

  return (
    <ControllerBox isDark={isDark}>
      <LetterBox
        weight="extraBold"
        size="h3"
        color={isDark ? "light" : "primary"}
      >
        {header}
      </LetterBox>
      <Input isDark={isDark} type="search" />
      {menuList?.map((menu) => (
        <ControllerMenu
          isDark={isDark}
          title={menu.title}
          menuItems={menu.menuItems}
        ></ControllerMenu>
      ))}
    </ControllerBox>
  );
};

export default Controller;
