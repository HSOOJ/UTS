import styled from "styled-components";
import { ThemeType } from "../../../global/theme";

export const AboutMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: relative; */
`;

export const CenterText = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

export const FirstImg = styled.div`
  position: relative;
`;

export const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(80%);
`;

export const Text = styled.h1`
  color: white;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 80px;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-weight: bold;
  letter-spacing: 5px;
`;

export const AboutExplainDiv = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TimeLineTitleText = styled.p<ThemeType>`
  margin-top: 10px;
  color: ${({ isDark }) =>
    isDark
      ? `#759AFF
`
      : `black`};
  font-size: 20px;
`;

export const TimeLineText = styled.p<ThemeType>`
  color: ${({ isDark }) => (isDark ? `white` : `black`)};
`;
