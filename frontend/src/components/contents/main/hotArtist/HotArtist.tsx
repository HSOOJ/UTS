import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const settings = {
  dots: false,
  slidesToShow: 6,
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
  border-radius: 30px;
`;

export const HotArtist = () => {
  let url =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const datas = [
    { name: ["2", "3"], urls: [url, url] },
    { name: ["4", "5"], urls: [url, url] },
    { name: ["6", "7"], urls: [url, url] },
    { name: ["8", "9"], urls: [url, url] },
    { name: ["10", "11"], urls: [url, url] },
    { name: ["12", "13"], urls: [url, url] },
    { name: ["14", "15"], urls: [url, url] },
    { name: ["16", "17"], urls: [url, url] },
  ];
  const top = { name: "1", url: url };

  return (
    <>
      <h1>Hot Artist Component</h1>
      <h2>아티스트 목록 - 인기순</h2>

      <NavLink to={`/artist/${top.name}`}>
        <Wrapper>
          <ImageContainer>
            <h2>{top.name}</h2>
            <Image width="150" src={top.url} alt="mainImage" />
          </ImageContainer>
        </Wrapper>
      </NavLink>

      <Container>
        <StyledSlider {...settings}>
          {datas.map((data, index) => {
            return (
              <div key={index}>
                <NavLink to={`/artist/${data.name[0]}`}>
                  <ImageContainer>
                    <h2>{data.name[0]}</h2>
                    <Image width="150" src={data.urls[0]} alt={data.name[0]} />
                  </ImageContainer>
                </NavLink>
                <NavLink to={`/artist/${data.name[1]}`}>
                  <ImageContainer>
                    <h2>{data.name[1]}</h2>
                    <Image width="150" src={data.urls[1]} alt={data.name[1]} />
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
