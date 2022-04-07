import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const EditionInfoBoxDiv = styled.div<ThemeType>`
  display: flex;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  gap: 5px;
  padding-left: 30px;
  border-radius: 10px;
  padding: 30px;
`;

export const EditionImg = styled.img`
  border-radius: 50%;
  float: left;
  left: 0%;
  width: 200px;
  height: 200px;
`;

export const EditionDetail = styled.div`
  margin-left: 20px;
  width: 500px;
`;

export const EditionTitle = styled.div`
  margin-bottom: 10px;
`;

export const EditionContent = styled.div`
  /* background-color: black; */
  width: 470px;
  overflow: scroll;
  word-break: break-all;
`;
