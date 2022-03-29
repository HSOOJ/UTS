import styled from "styled-components";
import { IBadge } from "./Badge.types";
import Palette from "../../../foundation/color/Palette";
import { motion } from "framer-motion";

const bgColor = {
  like: Palette.Giallo200,
  report: Palette.Rosso100,
  verified: Palette.Blu200,
};

export const LayOut = styled(motion.div)<IBadge>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: ${({ borderColor }) => borderColor && `4px solid ${borderColor}`};
  background-color: ${({ type }) => bgColor[type]};
  border-radius: 50%;
`;

export const LayOutVariants = {
  hover: {
    scale: 1.2,
  },
};
