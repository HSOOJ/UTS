import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ThemeType } from "../../../global/theme";

export const ModalDiv = styled.div<ThemeType>`
  margin-top: 50px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({ isDark }) => (isDark ? Palette.Nero100 : `#e3ebff`)};
  width: 1000px;
  gap: 10px;
  border-radius: 10px;
  z-index: 100;
  margin-left: 25%;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
