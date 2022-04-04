import styled from "styled-components";
import Slider from "react-slick";
import { ThemeType } from "../../../global/theme";
import Palette from "../../../foundation/color/Palette";

export const MainDiv = styled.div`
  margin-top: 20px;
`;
export const Layout = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 100%;
  margin: 1.5em auto 1.5em;
  border: solid 0.3em;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa)"
      : "linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa)"};
  border-image-slice: 1;
  border-radius: 10px;
  padding: 0 0 0 2%;
`;
export const LayoutPaddingLeft = styled.div`
  padding: 0 0 0 5%;
`;
export const LayoutPaddingLeft2 = styled.div`
  padding: 0 0 0 3%;
`;
export const Wrapper = styled.div`
  float: left;
`;
export const Container = styled.div`
  overflow: hidden;
`;
export const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;
export const ImageContainer = styled.div`
  padding: 1em;
  margin: 10px 0 0 0;
  height: 100%;
  position: relative;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`;
export const ImageTop = styled.img`
  width: 325px;
  height: 325px;
  border-radius: 30px;
`;
export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 30px;
`;
export const ImageBadge = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10% / 50%;
  margin: 0 0 10px 0;
`;
export const ImageSeller = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 0 0 10px 0;
`;
export const ImageBoarding = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px 100px / 120px;
`;
export const TextGradientRed = styled.p`
  font-size: 40px;
  font-weight: bold;
  background: linear-gradient(to top, #f3ea62, #d32029);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientBlue = styled.p`
  font-size: 40px;
  font-weight: bold;
  background: linear-gradient(to top, #a8c1f8, #177ddc);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientAside = styled.p<ThemeType>`
  font-size: 35px;
  display: inline;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const TextContent = styled.p<ThemeType>`
  font-size: 25px;
  display: inline;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const TextNameTop = styled.div`
  z-index: 1;
  position: absolute;
  font-weight: bold;
  top: 10%;
  left: 10%;
  color: white;
  font-size: 30px;
`;
export const TextSubTop = styled.div`
  z-index: 1;
  position: absolute;
  top: 22%;
  left: 10%;
  color: white;
  font-size: 16px;
`;
export const TextName = styled.div`
  z-index: 1;
  position: absolute;
  font-weight: bold;
  top: 15%;
  left: 12%;
  color: white;
`;
export const TextSub = styled.div`
  z-index: 1;
  position: absolute;
  top: 27%;
  left: 12%;
  color: white;
`;
