import styled from "styled-components";
import { IImage } from "./Image.types";

export const LayOut = styled.img<IImage>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ borderSize }) => borderSize && `${borderSize}px solid`};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${({ shape }) => (shape === "round" ? `50%` : "6px")};
  object-fit: cover;

  filter: blur(${({ blurDeg }) => blurDeg});
  cursor: pointer;
`;
