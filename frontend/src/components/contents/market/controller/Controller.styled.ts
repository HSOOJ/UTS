import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { InputBox } from "../../../containers/input/Input.styled";
import { LetterBoxStyle } from "../../../containers/letterBox/LetterBox.styled";
import { IController } from "./Controller.types";

const bgColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Nero100,
};

const borderColor = {
  light: Palette.Blu100,
  dark: Palette.Grigio500,
};

export const ControllerBox = styled.div<IController>`
  border: 1px solid
    ${({ isDark }) => (isDark ? borderColor["dark"] : borderColor["light"])};
  border-radius: 12px;
  display: flex;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 240px;
  max-width: 270px;
  height: 100%;
  background-color: ${(props) =>
    props.isDark ? bgColor["dark"] : bgColor["light"]};

  ${LetterBoxStyle} {
    margin: 12px 0px 12px 0px;
  }

  ${InputBox} {
    margin: 3px 0px 8px 0px;
  }
`;
