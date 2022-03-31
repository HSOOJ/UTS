import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const BadgeImg = styled.img`
  border-radius: 50%;
`;

export const BadgeInfoPersonDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  width: 700px;
  padding: 20px;
  justify-content: center;
  gap: 60px;
`;

export const BadgeLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BadgeRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 200px;
`;

export const BadgeCenter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 250px;
`;
