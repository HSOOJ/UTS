import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const InfoMainbox = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

export const InfoDetailBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoMoreDetailBox = styled.div`
  text-align: center;
  width: 200px;
`;
