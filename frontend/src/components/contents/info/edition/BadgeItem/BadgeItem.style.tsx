import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const BadgeImg = styled.img`
  border-radius: 50%;
`;

export const OwnerImg = styled.img`
  border-radius: 50%;
  margin-top: 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const BadgeInfo = styled.div`
  padding: 15px;
  display: flex;
  gap: 30px;
`;

export const BadgeInfoLeft = styled.div`
  width: 70px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const BadgeInfoRight = styled.div`
  width: 70px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const BadgeDiv = styled.div<ThemeType>`
  margin-bottom: 10px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 230px;
  &:hover {
    transform: scale(1.02);
  }
`;

export const BadgeSizeControl = styled.div`
  width: 160px;
`;

export const BadgeLikeButton = styled.div`
  width: 35px;
  float: right;
`;

export const BadgeButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
