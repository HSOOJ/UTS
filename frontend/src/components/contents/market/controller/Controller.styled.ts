import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { LetterBoxStyle } from "../../../containers/letterBox/LetterBox.styled";
import { IController } from "./Controller.types";

const bgColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Nero100,
};

export const ControllerBox = styled.div<IController>`
  border: 0px;
  border-radius: 12px;
  display: flex;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 280px;
  height: 100%;
  background-color: ${(props) =>
    props.isDark ? bgColor["dark"] : bgColor["light"]};

  ${LetterBoxStyle} {
    margin: 12px 0px 12px 0px;
  }
`;
