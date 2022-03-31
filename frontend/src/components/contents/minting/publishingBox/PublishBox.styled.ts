import styled from "styled-components";
import { ThemeType } from "../../../../global/theme";
import { bgColor } from "../Minting.styled";

export const LayOut = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 880px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const InfoLayOut = styled.div<ThemeType>`
  display: flex;
  flex-direction: column;
  min-width: 540px;
  padding: 10px;
  width: 100%;
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark2"] : bgColor["light2"]};
  border-radius: 8px;
`;

export const BottomLayOut = styled.div`
  display: flex;
`;

export const LayOutFlexEnd = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-self: flex-end;
  align-items: flex-end;
`;

export const BottomHalfLayOut = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
