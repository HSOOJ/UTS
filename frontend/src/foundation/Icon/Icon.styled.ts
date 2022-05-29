import styled from "styled-components";
import FontColor from "../font/color/FontColor";
import type IIcon from "./Icon.types";

const Svg = styled.svg<IIcon>`
  flex: 0 0 auto;
  color: ${({ color }) => color && FontColor[color]};
`;

export default Svg;
