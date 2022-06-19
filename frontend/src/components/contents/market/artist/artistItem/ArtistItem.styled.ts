import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const borderColor = {
  light: "#e3ebff",
  dark: Palette.Nero100,
};

const LayOutBorderColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Grigio400,
};

export const LayOut = styled.div`
  min-width: 320px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BgImageLayOut = styled.div`
  position: relative;
`;

export const ProfileImageLayOut = styled.div`
  position: absolute;
  top: 55px;
  left: 10px;
`;

export const NameBoxLayOut = styled.div`
  overflow: scroll;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  align-self: flex-end;
  width: 55%;
  height: 40px;
`;

export const SalesLayOut = styled.div`
  display: flex;
  gap: 10px;
  height: 75px;
`;

export const SalesItemBox = styled.div<ThemeType>`
  border: 1px solid
    ${({ isDark }) =>
      isDark ? LayOutBorderColor["dark"] : LayOutBorderColor["light"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Grigio500 : Palette.Blu100};
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const BadgeLayOut = styled.div`
  position: absolute;
  border-radius: 50%;
  bottom: -5px;
  right: 10px;
`;

export const TokenLayOut = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 132px;
`;

export const TokenItemLayOut = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TokenItemBox = styled(SalesItemBox)`
  position: relative;
  justify-content: flex-end;
  padding-bottom: 10px;
  gap: 3px;
`;

export const TokenImageLayOut = styled.div`
  position: absolute;
  top: -9px;
`;
