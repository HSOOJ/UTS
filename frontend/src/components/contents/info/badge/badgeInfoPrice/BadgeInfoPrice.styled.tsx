import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const BadgeInfoPriceDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 20px;
`;

export const ListPriceDiv = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
export const CollectionDiv = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const LikeDiv = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const CollectionInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const CollectionInfoDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditionImg = styled.img`
  border-radius: 50%;
`;
