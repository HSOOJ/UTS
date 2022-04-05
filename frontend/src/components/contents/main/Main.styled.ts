import styled from "styled-components";
import Slider from "react-slick";
import { ThemeType } from "../../../global/theme";
import Palette from "../../../foundation/color/Palette";

export const MainDiv = styled.div`
  margin-top: 50px;
`;

export const Layout = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 100%;
  margin-top: 20px;
  /* margin: 1.5em auto 1.5em; */
  /* border: solid 0.3em;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa)"
      : "linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa)"};
  border-image-slice: 1; */
  border-radius: 10px;
`;
export const LayoutPaddingLeft = styled.div`
  /* padding: 0 0 0 5%; */
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
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.05);
  }
`;
export const ImageTop = styled.img`
  width: 325px;
  height: 340px;
  border-radius: 30px;
`;
export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 30px;
`;
export const ImageBadge = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10% / 50%;
  margin: 0 0 10px 0;
  /* box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #0066ff,
    0 0 0.8rem #0066ff, 0 0 2.8rem #0066ff, inset 0 0 1.3rem #0066ff; */
`;
export const ImageSeller = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  margin: 0 0 10px 0;
  /* box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #fff0b9,
    0 0 0.8rem #fff0b9, 0 0 2.8rem #fff0b9, inset 0 0 1.3rem #fff0b9; */
`;
export const ImageBoarding = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px 100px / 120px;
`;
export const TextGradientRed = styled.p`
  font-size: 40px;
  font-weight: 900;
  background: linear-gradient(to top, #f3ea62, #d32029);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientBlue = styled.p`
  font-size: 40px;
  font-weight: 900;
  background: linear-gradient(to top, #a8c1f8, #177ddc);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientAside = styled.p<ThemeType>`
  font-size: 30px;
  font-weight: 700;
  display: inline;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
export const TextContent = styled.p<ThemeType>`
  font-size: 18px;
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

export const BadgeImageContainer = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`;

export const MainCardDiv = styled.div`
  margin-top: 30px;
`;

export const TextNeonRed = styled.h1<ThemeType>`
  width: 500px;
  font-size: 40px;
  font-weight: 300;
  font-style: italic;
  color: ${({ isDark }) => (isDark ? "white" : "grey")};
  padding: 10px;
  /* border: 2px solid #fff; */
  border-radius: 20px;
  text-transform: uppercase;
  animation: flicker 1.5s infinite alternate;

  h1::-moz-selection {
    background-color: #08f;
    color: #f40;
  }

  h1::selection {
    background-color: #08f;
    color: #f40;
  }

  h1:focus {
    outline: none;
  }
  @keyframes flicker {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
        0 0 2rem #f40, 0 0 4rem #f40, 0 0 6rem #f40, 0 0 8rem #f40,
        0 0 10rem #f40;

      /* box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 2rem #08f,
        inset 0 0 2rem #08f, 0 0 4rem #08f, inset 0 0 4rem #08f; */
    }
    20%,
    24%,
    55% {
      text-shadow: none;
      box-shadow: none;
    }
  }
`;

export const TextNeonBlue = styled.h2<ThemeType>`
  width: 500px;
  font-size: 40px;
  font-weight: 300;
  font-style: italic;
  color: ${({ isDark }) => (isDark ? "white" : "grey")};
  padding: 10px;
  /* border: 2px solid #fff; */
  border-radius: 20px;
  text-transform: uppercase;
  animation: flickers 1.5s infinite alternate;

  h2::-moz-selection {
    background-color: #08f;
    color: #f40;
  }

  h2::selection {
    background-color: #08f;
    color: #f40;
  }

  h2:focus {
    outline: none;
  }
  @keyframes flickers {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
        0 0 2rem #0066ff, 0 0 4rem #0066ff, 0 0 6rem #0066ff, 0 0 8rem #0066ff,
        0 0 10rem #0066ff;

      /* box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 2rem #08f,
        inset 0 0 2rem #08f, 0 0 4rem #08f, inset 0 0 4rem #08f; */
    }
    20%,
    24%,
    55% {
      text-shadow: none;
      box-shadow: none;
    }
  }
`;
