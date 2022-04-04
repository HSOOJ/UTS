import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const ArtistManageFormDiv = styled.div<ThemeType>`
  margin-top: 10px;
  padding: 20px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Grigio500 : Palette.Blu100};
  border-radius: 10px;
`;

export const ArtistAcceptDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
`;
