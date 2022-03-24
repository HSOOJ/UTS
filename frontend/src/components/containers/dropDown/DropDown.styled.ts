import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { IDropDown } from "./DropDown.types";

const bgColor = {
  light: Palette.Grigio100,
  dark: Palette.Grigio400,
};

export const LayOut = styled.div<IDropDown>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border-radius: 12px;
  border: ${(props) => (props.isDark ? null : `1px solid ${Palette.Blu100}`)};
  background-color: ${(props) => bgColor[props.isDark ? "dark" : "light"]};
`;
