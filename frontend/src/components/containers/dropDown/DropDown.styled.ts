import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { IDropDown } from "./DropDown.types";
import { motion } from "framer-motion";

const bgColor = {
  light: Palette.Grigio100,
  dark: Palette.Grigio500,
};

export const LayOut = styled(motion.div)<IDropDown>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border-radius: 12px;
  border: ${(props) => (props.isDark ? null : `1px solid ${Palette.Blu100}`)};
  background-color: ${(props) => bgColor[props.isDark ? "dark" : "light"]};
`;

export const DropDownLayOutVariants = {
  entry: { opacity: 0, y: -10 },
  presence: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -5 },
};
