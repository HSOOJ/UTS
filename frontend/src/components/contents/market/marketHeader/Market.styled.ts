import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { ThemeType } from "../../../../global/theme";

export const LayOut = styled.div<ThemeType>`
  display: flex;
  position: relative;
  border-radius: 60px;
  width: 70%;
  height: 120px;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  gap: 5px;
  background: linear-gradient(
    140.33deg,
    ${({ isDark }) => (isDark ? Palette.Blu200 : Palette.Blu100)},
    ${Palette.Blu200}
  );
  span {
    z-index: 1;
  }

  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(25px);
    background: linear-gradient(
      140.33deg,
      ${Palette.Blu100},
      ${Palette.Blu200}
    );
    transform: translateY(0.7rem) scale(0.9);
  }
`;
