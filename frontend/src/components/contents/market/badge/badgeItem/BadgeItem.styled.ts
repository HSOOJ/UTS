import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";

export const borderColor = {
  light: "#e3ebff",
  dark: Palette.Nero100,
};

export const LayOut = styled.div`
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const HeaderLayOut = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-around;
  position: relative;
  height: 180px;
`;

export const BadgeImageLayOut = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: 90px;
  box-shadow: 0px 0px 12px ${Palette.BluOpacity100};
`;

export const NameBoxLayOut = styled.div`
  overflow-x: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  height: max-content;
  gap: 3px;
  justify-content: space-between;
  flex-direction: column;
  align-self: flex-end;
  width: 100%;
`;

export const ContentLayOut = styled.div`
  display: flex;
  gap: 10px;
  height: 95px;
`;

export const OwnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 120px;
  height: 100%;
  border-radius: 8px;
`;

export const BadgeLayOut = styled.div`
  position: absolute;
  border-radius: 50%;
  bottom: -5px;
  right: 10px;
`;

export const BottomLayOut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BottomBottomLayOut = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 80%;
  }
  align-items: center;
`;
