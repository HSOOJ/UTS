import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  TextGradientRed,
  ImageBadge,
  ImageContainer,
  TextGradientAside,
  Layout,
  StyledSlider,
  TextContent,
  Wrapper,
} from "../Main.styled";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
};

export const HotBadge = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  let urls = [
    "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcoacAK%2FbtrtITSdtOg%2FVEhZQHJ0y7eroYe2KNF6q0%2Fimg.jpg",
    "https://media4.giphy.com/media/ho0xXatV7b3Fo1ZRXN/giphy.gif",
    "https://cdn.vox-cdn.com/thumbor/SiIyeqmKIJGcOJccz94pHgwmgvQ=/0x0:1400x1400/1200x800/filters:focal(588x588:812x812):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68837730/poptart1redrainbowfix_1.0.gif",
    "https://c.tenor.com/ex0ssYC5xdEAAAAd/metakongz-nft.gif",
    "https://miro.medium.com/max/1400/1*SNOwGBmvP12qQA-NA4FXmg.gif",
    "https://images.squarespace-cdn.com/content/v1/5ddad07e6a21930596a863a6/1620248513626-3CUN9IR68L0QZHTUEII7/Mountain+GIF.gif",
    "https://images.squarespace-cdn.com/content/v1/5ddad07e6a21930596a863a6/1620241984557-ZPQ8YWOWN8NIYIKZH54R/Random+Card+NFT+Cesar+Langa",
    "https://public.nftstatic.com/static/nft/zipped/a81fb83270264069b20d998e738de84b_zipped.gif",
  ];
  const datas = [
    { rank: ["0", "1"], name: ["name", "NAME"], urls: [urls[0], urls[1]] },
    { rank: ["2", "3"], name: ["name", "NAME"], urls: [urls[2], urls[3]] },
    { rank: ["4", "5"], name: ["name", "NAME"], urls: [urls[4], urls[5]] },
    { rank: ["6", "7"], name: ["name", "NAME"], urls: [urls[6], urls[7]] },
  ];

  let navigate = useNavigate();

  return (
    <>
      {/* <h1>Hot Badges Component</h1>
      <h2>NFT 목록 - 인기순(좋아요)</h2> */}
      <TextGradientRed>Hot </TextGradientRed>
      <TextGradientAside isDark={isDark}>Badges</TextGradientAside>
      <Layout isDark={isDark}>
        <Container>
          <StyledSlider {...settings}>
            {datas.map((data, index) => {
              return (
                <div key={index}>
                  <Wrapper>
                    <ImageContainer
                      onClick={() => {
                        navigate(`/badge/${data.rank[0]}`);
                      }}
                    >
                      <ImageBadge src={data.urls[0]} alt={data.rank[0]} />
                      <TextContent isDark={isDark}>
                        {data.rank[0]} | {data.name[0]}
                      </TextContent>
                    </ImageContainer>
                    <ImageContainer
                      onClick={() => {
                        navigate(`/badge/${data.rank[1]}`);
                      }}
                    >
                      <ImageBadge src={data.urls[1]} alt={data.rank[1]} />
                      <TextContent isDark={isDark}>
                        {data.rank[1]} | {data.name[1]}
                      </TextContent>
                    </ImageContainer>
                  </Wrapper>
                </div>
              );
            })}
          </StyledSlider>
        </Container>
      </Layout>
    </>
  );
};
