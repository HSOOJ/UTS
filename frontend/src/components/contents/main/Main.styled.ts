import styled from "styled-components";
import Slider from "react-slick";

export const Layout = styled.div`
  width: 100%;
  margin: 1.5em auto 1.5em;
  border: solid 0.3em;
  border-radius: 20px;
  border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  border-image-slice: 1;
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
  margin: 0 0 0 25px;
  padding: 1em;
  height: 100%;
  position: relative;
  cursor: pointer;
  text-align: center;
`;
export const ImageTop = styled.img`
  width: 325px;
  height: 325px;
  border-radius: 30px;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.08);
  }
`;
export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 30px;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.2);
  }
`;
export const ImageBadge = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10% / 50%;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.2);
  }
  margin: 10%;
`;
export const ImageSeller = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.2);
  }
  margin: 10%;
`;
export const ImageBoarding = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px 100px / 120px;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
  margin: 2%;
`;
export const TextGradientRed = styled.p`
  font-size: 60px;
  font-weight: bold;
  background: linear-gradient(to top, #f3ea62, #d32029);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientBlue = styled.p`
  font-size: 60px;
  font-weight: bold;
  background: linear-gradient(to top, #a8c1f8, #177ddc);
  color: transparent;
  -webkit-background-clip: text;
  display: inline;
`;
export const TextGradientAside = styled.p`
  font-size: 48px;
  display: inline;
  color: white;
`;
export const TextContent = styled.p`
  font-size: 25px;
  display: inline;
  color: white;
`;
export const TextNameTop = styled.div`
  z-index: 1;
  position: absolute;
  font-weight: bold;
  top: 10%;
  left: 10%;
  color: white;
`;
export const TextSubTop = styled.div`
  z-index: 1;
  position: absolute;
  top: 16%;
  left: 10%;
  color: white;
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
  top: 25%;
  left: 12%;
  color: white;
`;
