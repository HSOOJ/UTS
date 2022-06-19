import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const BadgeDetailDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  border-radius: 10px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;
