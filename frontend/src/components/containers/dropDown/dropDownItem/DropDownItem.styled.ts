import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import FontColor from "../../../../foundation/font/color/FontColor";
import { IDropDownItem } from "./DropDownItem.types";

export const LayOut = styled(motion.div)<IDropDownItem>`
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  border-radius: 8px;
  color: ${FontColor["primary"]};
  width: 100%;
  height: 100%;
`;

export const LayOutVariants = {
  hover: {
    backgroundColor: Palette.Blu200,
    color: FontColor["light"],
  },
};
