import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ThemeType } from "../../../global/theme";

export const Container = styled.div<ThemeType>`
  overflow: hidden;
  text-align: center;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  border-radius: 20px;
`;
export const ProfileContainerModify = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px 0; */
  padding: 20px 30px 20px 30px;
`;
export const ProfileContainerInfo = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px 0 25px 0;
`;
export const ImageContainer = styled.div`
  margin: 0 16px;
  padding: 1em;
`;
export const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;
export const TextMain = styled.p`
  font-size: 40px;
  /* background: linear-gradient(to right, #e4f88b, #84e2d8);
  color: transparent;
  -webkit-background-clip: text; */
`;
// export const ButtonModify = styled.button<ThemeType>`
//   -webkit-transition: all 0.3s;
//   -moz-transition: all 0.3s;
//   -o-transition: all 0.3s;
//   transition: all 0.3s;
//   background: none;
//   border: 2px solid #b2e58b;
//   border-radius: 25px;
//   color: ${({ isDark }) => (isDark ? "#fff" : "black")};
//   display: inline;
//   font-size: 13px;
//   font-weight: bold;
//   padding: 15px;
//   margin: 5px;
//   position: relative;
//   &:hover {
//     color: #b2e58b;
//   }
// `;

export const ButtonModify = styled.div`
  display: flex;
  gap: 20px;
`;

export const ProfileDetail = styled.div<ThemeType>`
  margin: 10px 40px 30px 40px;
  padding: 20px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Grigio500 : Palette.Blu100};
  border-radius: 10px;
`;

export const ButtonSelect = styled.button<{
  isDark?: boolean;
  isSelected: boolean;
}>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 3px solid #58d1c9;
  border-radius: 5px;
  color: ${({ isDark }) =>
    isDark
      ? ({ isSelected }) => (isSelected ? "#58d1c9" : "#fff")
      : ({ isSelected }) => (isSelected ? "#58d1c9" : "black")};
  display: inline;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 70px 15px 70px;
  margin: 0 10px 0 10px;
  position: relative;
  &:hover {
    color: #58d1c9;
  }
`;
