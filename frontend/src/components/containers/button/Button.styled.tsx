import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import FontColor from "../../../foundation/font/color/FontColor";
import FontSize from "../../../foundation/font/size/FontSize";
import FontWeight from "../../../foundation/font/weight/FontWeight";
import { IButton } from "./Button.types";

const bgColor = {
  primary: Palette.Blu300,
  secondary: Palette.Grigio500,
};

export const LayOut = styled(motion.button)<IButton>`
  width: 100%;
  height: 42px;
  font-weight: ${FontWeight["bold"]};
  border: 0px;
  color: ${({ styleVariant }) =>
    styleVariant === "primary" ? FontColor["light"] : FontColor["primary"]};
  border-radius: 10px;
  font-size: ${FontSize.h3}px;
  background-color: ${({ styleVariant }) =>
    styleVariant === "primary" ? bgColor[styleVariant] : bgColor[styleVariant]};
`;

export const ButtonLayOutVariantPrimary = {
  hover: { backgroundColor: Palette.Blu200 },
  exit: { backgroundColor: bgColor.primary },
};

export const ButtonLayOutVariantSecondary = {
  hover: { backgroundColor: Palette.Blu100 },
  exit: { backgroundColor: bgColor.secondary },
};
