import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { ThemeType } from "../../../../global/theme";
import { bgColor, borderColor } from "../Minting.styled";

export const LayOut = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div<ThemeType>`
  position: absolute;
  top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
  width: 360px;
  height: 360px;
  z-index: 9;
  border-radius: 8px;
  border: 1px solid
    ${({ isDark }) => (isDark ? borderColor["dark"] : borderColor["light"])};
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark1"] : bgColor["light2"]};
`;

export const SVGBox = styled(motion.div)`
  width: 180px;
  height: 180px;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const WalletBadge = styled.div<ThemeType>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  margin-bottom: 10px;
  border-radius: 16px;
  height: 32px;
  border: 1px solid
    ${({ isDark }) => (isDark ? Palette.Grigio400 : Palette.Blu100)};
`;
