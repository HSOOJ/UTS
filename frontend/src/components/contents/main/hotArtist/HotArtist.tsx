import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextGradientRed,
  Image,
  ImageContainer,
  ImageTop,
  TextGradientAside,
  Layout,
  StyledSlider,
  TextName,
  TextNameTop,
  TextSub,
  TextSubTop,
  Wrapper,
} from "../Main.styled";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 2,
  infinite: true,
  autoplay: true,
  speed: 500,
  pauseOnHover: true,
};

export const HotArtist = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  let urls = [
    "https://dimg.donga.com/wps/NEWS/IMAGE/2022/02/10/111691750.2.jpg",
    "http://newsimg.hankookilbo.com/2019/06/11/201906111677046181_1.jpg",
    "https://w.namu.la/s/5bd1f7b3210a6deba5560683c0cd62f61445e3d1069ef2325a2ed8de6050cb2454f98c27478a9db4a7b3fc052366431d626c38525e371e08fbe70e14de391f5d9f8a3ea241d9e8db2c534c41b01c81ae",
    "https://opgg-com-image.akamaized.net/attach/images/20210525033339.1367998.jpg",
    "http://newsimg.hankookilbo.com/2019/06/11/201906111677046181_1.jpg",
    "https://w.namu.la/s/5bd1f7b3210a6deba5560683c0cd62f61445e3d1069ef2325a2ed8de6050cb2454f98c27478a9db4a7b3fc052366431d626c38525e371e08fbe70e14de391f5d9f8a3ea241d9e8db2c534c41b01c81ae",
    "https://opgg-com-image.akamaized.net/attach/images/20210525033339.1367998.jpg",
    "http://newsimg.hankookilbo.com/2019/06/11/201906111677046181_1.jpg",
    "https://w.namu.la/s/5bd1f7b3210a6deba5560683c0cd62f61445e3d1069ef2325a2ed8de6050cb2454f98c27478a9db4a7b3fc052366431d626c38525e371e08fbe70e14de391f5d9f8a3ea241d9e8db2c534c41b01c81ae",
    "https://opgg-com-image.akamaized.net/attach/images/20210525033339.1367998.jpg",
    "http://newsimg.hankookilbo.com/2019/06/11/201906111677046181_1.jpg",
    "https://w.namu.la/s/5bd1f7b3210a6deba5560683c0cd62f61445e3d1069ef2325a2ed8de6050cb2454f98c27478a9db4a7b3fc052366431d626c38525e371e08fbe70e14de391f5d9f8a3ea241d9e8db2c534c41b01c81ae",
    "https://opgg-com-image.akamaized.net/attach/images/20210525033339.1367998.jpg",
  ];
  const top = { name: "0", url: urls[0] };
  const datas = [
    { name: ["1", "2"], urls: [urls[1], urls[2]] },
    { name: ["3", "4"], urls: [urls[3], urls[4]] },
    { name: ["5", "6"], urls: [urls[5], urls[6]] },
    { name: ["7", "8"], urls: [urls[7], urls[8]] },
    { name: ["9", "10"], urls: [urls[9], urls[10]] },
    { name: ["11", "12"], urls: [urls[10], urls[12]] },
  ];

  let navigate = useNavigate();

  return (
    <>
      <TextGradientRed>Hot </TextGradientRed>
      <TextGradientAside isDark={isDark}>Artist</TextGradientAside>
      <Layout isDark={isDark}>
        <Wrapper>
          <ImageContainer>
            <ImageTop
              src={top.url}
              alt="mainImage"
              onClick={() => {
                navigate(`/artist/${top.name}`);
              }}
            />
            <TextNameTop>{top.name}번 아티스트</TextNameTop>
            <TextSubTop>서브내용</TextSubTop>
          </ImageContainer>
        </Wrapper>

        <Container>
          <StyledSlider {...settings}>
            {datas.map((data, index) => {
              return (
                <div key={index}>
                  <ImageContainer>
                    <Image
                      src={data.urls[0]}
                      alt={data.name[0]}
                      onClick={() => {
                        navigate(`/artist/${data.name[0]}`);
                      }}
                    />
                    <TextName>{data.name[0]}번 아티스트</TextName>
                    <TextSub>서브내용</TextSub>
                  </ImageContainer>
                  <ImageContainer>
                    <Image
                      src={data.urls[1]}
                      alt={data.name[1]}
                      onClick={() => {
                        navigate(`/artist/${data.name[1]}`);
                      }}
                    />
                    <TextName>{data.name[1]}번 아티스트</TextName>
                    <TextSub>서브내용</TextSub>
                  </ImageContainer>
                </div>
              );
            })}
          </StyledSlider>
        </Container>
      </Layout>
    </>
  );
};
