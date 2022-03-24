import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

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
      <h1>Hot Artist Component</h1>
      <h2>아티스트 목록 - 인기순</h2>

      <Wrapper>
        <ImageContainer>
          <Image width="150" src={url} alt="mainImage" />
        </ImageContainer>
      </Wrapper>

      <Container>
        <StyledSlider {...settings}>
          {datas.map((data, index) => {
            return (
              <div key={index}>
                <h2>{data.name}</h2>
                <ImageContainer>
                  <Image width="150" src={data.urls[0]} alt={data.name} />
                </ImageContainer>
                <ImageContainer>
                  <Image width="150" src={data.urls[1]} alt={data.name} />
                </ImageContainer>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    </>
  );
};
