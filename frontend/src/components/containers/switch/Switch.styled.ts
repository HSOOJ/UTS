import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ThemeType } from "../../../global/theme";

const bgColor = {
  light: Palette.Grigio200,
  dark: Palette.Grigio400,
};

export const LayOut = styled(motion.div)<ThemeType>`
  display: flex;
  align-items: center;
  width: 66px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ isDark }) => bgColor[isDark ? "dark" : "light"]};
`;

export const Toggle = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: ${Palette.Grigio100};
  border-radius: 15px;
`;

export const ToggleVariants = {
  default: { x: 3 },
  clicked: {
    x: 33,
  },
};

export const LayOutVariants = {
  default: {},
  clicked: {
    backgroundColor: Palette.Blu300,
  },
};
