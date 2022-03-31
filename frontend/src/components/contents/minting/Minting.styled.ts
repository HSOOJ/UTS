import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ThemeType } from "../../../global/theme";

export const bgColor = {
  light1: Palette.BluOpacity100,
  light2: Palette.Blu100,
  dark1: Palette.Nero100,
  dark2: Palette.Grigio500,
};

export const FormLayOut = styled.form<ThemeType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
  margin: 0px 30px;

  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark1"] : bgColor["light1"]};
  width: 900px;
  height: 100%;
  border-radius: 10px;
`;
