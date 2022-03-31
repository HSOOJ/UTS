// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useEffect, useState } from "react";
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
  LayoutPaddingLeft,
  LayoutPaddingLeft2,
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
  // recoil
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

  // useState
  const [datas, setDatas] = useState([
    { id: 0, seq: "0", url: urls[0], name: "ArtistName", desc: "desc" },
    { id: 1, seq: "1", url: urls[1], name: "ArtistName", desc: "desc" },
    { id: 2, seq: "2", url: urls[2], name: "ArtistName", desc: "desc" },
    { id: 3, seq: "3", url: urls[3], name: "ArtistName", desc: "desc" },
    { id: 4, seq: "4", url: urls[4], name: "ArtistName", desc: "desc" },
    { id: 5, seq: "5", url: urls[5], name: "ArtistName", desc: "desc" },
    { id: 6, seq: "6", url: urls[6], name: "ArtistName", desc: "desc" },
    { id: 7, seq: "7", url: urls[7], name: "ArtistName", desc: "desc" },
    { id: 8, seq: "8", url: urls[8], name: "ArtistName", desc: "desc" },
    { id: 9, seq: "9", url: urls[9], name: "ArtistName", desc: "desc" },
    { id: 10, seq: "10", url: urls[10], name: "ArtistName", desc: "desc" },
    { id: 11, seq: "11", url: urls[11], name: "ArtistName", desc: "desc" },
  ]);

  // useNavigate
  let navigate = useNavigate();

  // Axios
  const GetOnboadring = () => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/main/artists/latest")
      .then((res: any) => {
        let updatedData = datas.slice(0);
        res.data.success.map((i: any, index: number) => {
          updatedData.splice(index, 1, {
            id: index,
            seq: i.artist_artist_seq,
            url: i.user_user_profile_image,
            name: i.user_user_nickname,
            desc: i.artist_artist_description,
          });
        });
        setDatas(updatedData);
      })
      .catch((res: any) => {
        console.log(res);
      });
  };

  // useEffect
  useEffect(GetOnboadring, []);

  return (
    <>
      {/* <h1>Onboarding Component</h1>
      <h2>아티스트 목록 - 아티스트 등록 최신 순</h2> */}
      <TextGradientBlue>On </TextGradientBlue>
      <TextGradientAside isDark={isDark}>Boarding</TextGradientAside>
      <Layout isDark={isDark}>
        <LayoutPaddingLeft2>
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
                      <TextNameTop>{data.name}</TextNameTop>
                      <TextSubTop>{data.desc}</TextSubTop>
                    </ImageContainer>
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </LayoutPaddingLeft2>
      </Layout>
    </>
  );
};
