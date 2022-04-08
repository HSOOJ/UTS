import { motion } from "framer-motion";
import styled from "styled-components";
import Palette from "../../../../foundation/color/Palette";
import { ThemeType } from "../../../../global/theme";

export const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: left;
  justify-content: left;
  padding: 25px;
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30px;
  cursor: pointer;
`;
export const ContainerText = styled.div`
  padding: 15px 0 0 15px;
  display: block;
  text-align: left;
  cursor: pointer;
`;
export const TextEditionName = styled.p<ThemeType>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const TextArtistName = styled.p<ThemeType>`
  font-size: 21px;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const TextNftNum = styled.p<ThemeType>`
  font-size: 18px;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const ButtonLoad = styled(motion.button)<ThemeType>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 1px solid
    ${({ isDark }) => (isDark ? Palette.Grigio500 : Palette.Blu100)};
  width: 120px;
  height: 120px;
  display: flex;
  align-self: center;
  justify-self: center;
  border-radius: 60px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  color: ${({ isDark }) => (isDark ? "white" : "black")};
  display: inline;
  font-size: 17px;
  font-weight: bold;
  padding: 15px 20px 15px 20px;
  margin: 15px 0 20px 0;
  position: relative;
  &:hover {
    color: #a8c1f8;
  }
`;
