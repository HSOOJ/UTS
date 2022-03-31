import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const ModalDiv = styled.div<ThemeType>`
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ isDark }) => (isDark ? Palette.Nero100 : `#e3ebff`)};
  width: 500px;
  gap: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 0 9999px;
  z-index: 100;
`;

export const UnderLine = styled.div<ThemeType>`
  border-bottom: 1px solid;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, yellow 0%, #35d835 50%, #3060ff 100%);"
      : "linear-gradient(to right, red 0%, #c4c422 50%, #002cbd 100%);"};
  border-image-slice: 1;
  margin-bottom: 10px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
