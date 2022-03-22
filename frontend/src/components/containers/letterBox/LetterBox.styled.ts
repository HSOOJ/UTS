import styled from "styled-components";
import FontColor from "../../../foundation/font/color/FontColor";
import FontSize from "../../../foundation/font/size/FontSize";
import FontWeight from "../../../foundation/font/weight/FontWeight";
import ILetterBox from "./LetterBox.types";

export const LetterBoxStyle = styled.span<ILetterBox>`
  font-size: ${({ size }) => (size ? FontSize[size] : FontSize.body1)}px;
  font-weight: ${({ weight }) => weight && FontWeight[weight]};
  color: ${({ color }) => color && FontColor[color]};
  line-height: 120%;
`;
