// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import {
  Container,
  TextGradientBlue,
  ImageBoarding,
  ImageContainer,
  TextGradientAside,
  Layout,
  StyledSlider,
  TextNameTop,
  TextSubTop,
} from "../Main.styled";

const settings = {
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 500,
  pauseOnHover: true,
};

export const Onboarding = () => {
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
  const datas = [
    { name: "0", url: urls[0] },
    { name: "1", url: urls[1] },
    { name: "2", url: urls[2] },
    { name: "3", url: urls[3] },
    { name: "4", url: urls[4] },
    { name: "5", url: urls[5] },
    { name: "6", url: urls[6] },
    { name: "7", url: urls[7] },
    { name: "8", url: urls[8] },
    { name: "9", url: urls[9] },
    { name: "10", url: urls[10] },
    { name: "11", url: urls[11] },
  ];

  let navigate = useNavigate();

  return (
    <>
      {/* <h1>Onboarding Component</h1>
      <h2>아티스트 목록 - 아티스트 등록 최신 순</h2> */}
      <TextGradientBlue>On </TextGradientBlue>
      <TextGradientAside isDark={isDark}>Boarding</TextGradientAside>
      <Layout isDark={isDark}>
        <Container>
          <StyledSlider {...settings}>
            {datas.map((data, index) => {
              return (
                <div key={index}>
                  <ImageContainer>
                    <ImageBoarding
                      src={data.url}
                      alt={data.name}
                      onClick={() => {
                        navigate(`/artist/${data.name}`);
                      }}
                    />
                    <TextNameTop>{data.name}번 아티스트</TextNameTop>
                    <TextSubTop>서브내용</TextSubTop>
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
