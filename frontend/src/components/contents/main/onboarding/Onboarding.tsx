import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const settings = {
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 500,
  pauseOnHover: true,
};

// styled-component
const Wrapper = styled.div`
  float: left;
`;
const Container = styled.div`
  overflow: hidden;
`;
const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;
const ImageContainer = styled.div`
  margin: 0 16px;
  padding: 1em;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px 100px / 120px;
`;

export const Onboarding = () => {
  let url =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const datas = [
    { name: "1", urls: [url, url] },
    { name: "2", urls: [url, url] },
    { name: "3", urls: [url, url] },
    { name: "4", urls: [url, url] },
    { name: "5", urls: [url, url] },
    { name: "6", urls: [url, url] },
    { name: "7", urls: [url, url] },
    { name: "8", urls: [url, url] },
  ];
  return (
    <>
      <h1>Onboarding Component</h1>
      <h2>아티스트 목록 - 아티스트 등록 최신 순</h2>
      <Container>
        <StyledSlider {...settings}>
          {datas.map((data, index) => {
            return (
              <div key={index}>
                <NavLink to={`/artist/${data.name}`}>
                  <ImageContainer>
                    <h2>{data.name}</h2>
                    <Image width="400" src={data.urls[0]} alt={data.name} />
                  </ImageContainer>
                </NavLink>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    </>
  );
};
