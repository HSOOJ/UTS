import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ICard } from "./Card.types";

const bgColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Nero100,
};

export const LayOut = styled(motion.div)<ICard>`
  min-width: 300px;
  max-width: 390px;
  width: 100%;
  height: 420px;
  border-radius: 10px;
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark"] : bgColor["light"]};
`;

export const CardLayOutVariants = {
  hover: {
    scale: 0.99,
  },
  tap: {
    scale: 0.97,
  },
};
