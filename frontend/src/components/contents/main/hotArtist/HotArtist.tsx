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
import { useEffect, useState } from "react";
import axios from "axios";

export const HotArtist = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    speed: 500,
    pauseOnHover: true,
  };
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
  const arr = [1, 3, 5, 7, 9, 11];

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
    { id: 12, seq: "12", url: urls[12], name: "ArtistName", desc: "desc" },
  ]);

  // useNavigate
  let navigate = useNavigate();

  // Axios
  const GetHotArtist = () => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/main/artists/popular")
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
  useEffect(GetHotArtist, []);

  return (
    <>
      <TextGradientRed>Hot </TextGradientRed>
      <TextGradientAside isDark={isDark}>Artist</TextGradientAside>
      <Layout isDark={isDark}>
        <Wrapper>
          <ImageContainer>
            <ImageTop
              src={datas[0].url}
              alt="mainImage"
              onClick={() => {
                navigate(`/artist/${datas[0].seq}`);
              }}
            />
            <TextNameTop>{datas[0].name}</TextNameTop>
            <TextSubTop>{datas[0].desc}</TextSubTop>
          </ImageContainer>
        </Wrapper>
        <Container>
          <StyledSlider {...settings}>
            {arr.map((a) => {
              return (
                <div key={a}>
                  <ImageContainer>
                    <Image
                      src={datas[a].url}
                      alt={datas[a].name}
                      onClick={() => {
                        navigate(`/artist/${datas[a].seq}`);
                      }}
                    />
                    <TextName>{datas[a].name}</TextName>
                    <TextSub>{datas[a].desc}</TextSub>
                  </ImageContainer>
                  <ImageContainer>
                    <Image
                      src={datas[a + 1].url}
                      alt={datas[a + 1].name}
                      onClick={() => {
                        navigate(`/artist/${datas[a + 1].seq}`);
                      }}
                    />
                    <TextName>{datas[a + 1].name}</TextName>
                    <TextSub>{datas[a + 1].desc}</TextSub>
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
