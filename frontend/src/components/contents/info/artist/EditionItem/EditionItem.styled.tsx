import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const EditionItemDiv = styled.div<ThemeType>`
  padding: 20px;
  width: 700px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  border-radius: 10px;
  margin-bottom: 15px;
  &:hover {
    transform: scale(1.01);
  }
`;

export const EditionItemImg = styled.img`
  border-radius: 50%;
  float: left;
  margin-right: 30px;
`;

export const EditionItemDetail = styled.div`
  /* float: right; */
`;

export const EditionItemMoreDetail = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;
