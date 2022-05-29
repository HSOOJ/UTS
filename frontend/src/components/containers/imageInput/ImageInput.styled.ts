import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import FontColor from "../../../foundation/font/color/FontColor";
import FontSize from "../../../foundation/font/size/FontSize";
import FontWeight from "../../../foundation/font/weight/FontWeight";
import { IImageInput } from "./ImageInput.types";

const bgColor = {
  light: Palette.Grigio100,
  dark: Palette.Nero100,
};

const borderColor = {
  light: {
    normal: Palette.Blu200,
    error: Palette.Rosso100,
  },
  dark: {
    normal: Palette.Grigio400,
    error: Palette.Rosso100,
  },
};

const iconColor = {
  light: Palette.Grigio300,
  dark: Palette.Grigio500,
};

export const LayOut = styled.div<IImageInput>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 240px;
  width: 100%;
  gap: 0.5rem;
  white-space: nowrap;

  padding: 3rem;
  border-radius: 8px;
  border: 2px dashed
    ${({ isDark, errMessage }) =>
      borderColor[isDark ? "dark" : "light"][errMessage ? "error" : "normal"]};

  background-color: ${({ isDark }) => bgColor[isDark ? "dark" : "light"]};
  cursor: pointer;
`;

export const Title = styled.div`
  padding-top: 1rem;
  color: ${Palette.Blu200};
  font-weight: ${FontWeight["extraBold"]};
`;

export const Description = styled.div`
  color: ${Palette.Grigio400};
  font-weight: ${FontWeight["bold"]};
  font-size: ${FontSize["body2"]};
`;
export const ErrorLayOut = styled(motion.div)`
  margin-top: 5px;
  color: ${FontColor["danger"]};
`;

export const errVariants = {
  initial: { y: -30, opacity: 0.5 },
  entry: { y: 0, opacity: 1 },
  exit: {},
};
