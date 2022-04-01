import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  TextGradientBlue,
  ImageSeller,
  ImageContainer,
  TextGradientAside,
  Layout,
  StyledSlider,
  TextContent,
  Wrapper,
  LayoutPaddingLeft,
} from "../Main.styled";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import { useEffect, useState } from "react";
import axios from "axios";

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
};

export const TopSeller = () => {
  // recoil
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
  const arr = [0, 2, 4, 6];

  // useState
  const [datas, setDatas] = useState([
    { id: 0, seq: "0", url: urls[0], name: "SellerName", vol: "vol" },
    { id: 1, seq: "1", url: urls[1], name: "SellerName", vol: "vol" },
    { id: 2, seq: "2", url: urls[2], name: "SellerName", vol: "vol" },
    { id: 3, seq: "3", url: urls[3], name: "SellerName", vol: "vol" },
    { id: 4, seq: "4", url: urls[4], name: "SellerName", vol: "vol" },
    { id: 5, seq: "5", url: urls[5], name: "SellerName", vol: "vol" },
    { id: 6, seq: "6", url: urls[6], name: "SellerName", vol: "vol" },
    { id: 7, seq: "7", url: urls[7], name: "SellerName", vol: "vol" },
  ]);

  // useNavigate
  let navigate = useNavigate();

  // Axios
  const GetTopSeller = () => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/main/topsellers")
      .then((res: any) => {
        console.log(res.data.success);
        let updatedData = datas.slice(0);
        res.data.success.map((i: any, index: number) => {
          updatedData.splice(index, 1, {
            id: index,
            seq: i.userSeq,
            url: i.userImage,
            name: i.userNickname,
            vol: i.userVolume,
          });
        });
        setDatas(updatedData);
      })
      .catch((res: any) => {
        console.log(res);
      });
  };

  // useEffect
  useEffect(GetTopSeller, []);

  return (
    <>
      {/* <h1>Top Sellers Component</h1>
      <h2>탑셀러 - 일반유저 (아티스트 아닌) 누적거래</h2> */}
      <TextGradientBlue>Top </TextGradientBlue>
      <TextGradientAside isDark={isDark}>Sellers</TextGradientAside>
      <Layout isDark={isDark}>
        <LayoutPaddingLeft>
          <Container>
            <StyledSlider {...settings}>
              {arr.map((a) => {
                return (
                  <div key={a}>
                    <Wrapper>
                      <ImageContainer
                        onClick={() => {
                          navigate(`/profile/${datas[a].seq}`);
                        }}
                      >
                        <ImageSeller src={datas[a].url} alt={datas[a].name} />
                        <TextContent isDark={isDark}>
                          {datas[a].name}
                          {/* {datas[a].name} / {datas[a].vol} */}
                        </TextContent>
                      </ImageContainer>
                      <ImageContainer
                        onClick={() => {
                          navigate(`/profile/${datas[a + 1].seq}`);
                        }}
                      >
                        <ImageSeller
                          src={datas[a + 1].url}
                          alt={datas[a + 1].name}
                        />
                        <TextContent isDark={isDark}>
                          {datas[a + 1].name}
                          {/* {datas[a + 1].name} / {datas[a + 1].vol} */}
                        </TextContent>
                      </ImageContainer>
                    </Wrapper>
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </LayoutPaddingLeft>
      </Layout>
    </>
  );
};
