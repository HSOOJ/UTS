import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { ThemeType } from "../../../../global/theme";

const bannerGradient = css<ThemeType>`
  background: linear-gradient(
    140.33deg,
    ${({ isDark }) => (isDark ? Palette.Blu200 : Palette.Blu100)},
    ${({ isDark }) => (isDark ? Palette.BluOpacity100 : Palette.Blu200)},
    ${Palette.Rosso100}
  );
`;

export const LayOut = styled.div<ThemeType>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 110px;
  min-width: 500px;
  width: 67%;
  height: 220px;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1.5rem;
  padding: 30px;
  margin-bottom: 1.5rem;
  gap: 10px;

  span,
  image {
    z-index: 1;
  }

  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    filter: blur(110px);
    ${bannerGradient}
    transform: translateY(0.5rem)
  }
`;

export const ImageLayOut = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`;
