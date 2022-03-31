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
  width: 400px;
  gap: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 0 9999px;
  z-index: 100;
`;

export const BadgeImg = styled.img`
  display: flex;
  flex-direction: row;
  border-radius: 50%;
  margin-left: auto;
`;

export const BuyBadgeModalHeader = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
`;

export const LetterBoxRight = styled.div`
  text-align: end;
  margin-bottom: 5px;
`;

export const UnderLine = styled.div<ThemeType>`
  border-bottom: 1px solid;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, yellow 0%, #35d835 50%, #3060ff 100%);"
      : "linear-gradient(to right, red 0%, #c4c422 50%, #002cbd 100%);"};
  border-image-slice: 1;
`;
