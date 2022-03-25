import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ICard } from "./Card.types";

const bgColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Nero100,
};

export const LayOut = styled.div<ICard>`
  min-width: 280px;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark"] : bgColor["light"]};
`;
