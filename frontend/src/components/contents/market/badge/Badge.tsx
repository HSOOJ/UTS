import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeAtom } from "../../../../recoil/theme";
import { ButtonLoad } from "../../profile/nftBadgeList/NftBadgeList.style";
import { GridLayOut } from "./Badge.styled";
import { BadgeItem } from "./badgeItem/BadgeItem";
import { IBadgeItem } from "./badgeItem/BadgeItem.types";

// const APIs: IBadgeItem[] = [
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "JM-Gold",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "Very Long Long Name Badge",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "JM-Gold",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "Very Long Long Name Badge",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     liked: true,
//     like: 87321,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "JM-Gold",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     liked: false,
//     like: 87321,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "Very Long Long Name Badge",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "JM-Gold",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     like: 87321,
//     liked: false,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "Very Long Long Name Badge",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     liked: true,
//     like: 87321,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "JM-Gold",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
//   {
//     id: "1",
//     category: "music",
//     liked: false,
//     like: 87321,
//     badgeImgSrc:
//       "https://cdn.uinterview.com/wp-content/uploads/cms/uinterview/reviews_reviews_image/6e9f7990affdef769cd223c4b502d2f2.jpg",
//     name: "Very Long Long Name Badge",
//     artistSrc:
//       "https://cdn.cnn.com/cnnnext/dam/assets/170629030609-john-mayer-rolling-stone-exlarge-16-9.jpg",
//     edition: { number: 1, totalNumber: 300 },
//     owner: {
//       ownerId: "simpson",
//       profileSrc:
//         "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/CPBTOUCWKBA4NCNBBRWCRL4HNA.jpg",
//     },
//     price: 1.11,
//   },
// ];

export const Badge = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;

  // useState
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);

  // Axios
  const GetNftsMarket = () =>
    axios({
      method: "get",
      url: "http://j6a105.p.ssafy.io:8080/api/market/nfts",
      params: {
        sortby: 0,
        category: 0,
      },
    }).then((res) => {
      // console.log(res);
      setDatas(res.data.success);
      setLoading(false);
    });

  // useEffect
  useEffect(() => {
    GetNftsMarket();
  }, []);

  return (
    <GridLayOut>
      {/* {APIs.map((api, idx) => (
        <BadgeItem key={api.id} {...api} />
      ))} */}
      {loading ? (
        <>
          <SpinContainer>
            <Spin tip="Loading..." />
          </SpinContainer>
        </>
      ) : (
        <>
          {load1 || load2 ? (
            <>
              {load2 ? (
                <>
                  {datas.map((data, index) => {
                    return <BadgeItem key={index} {...data} />;
                  })}
                  <ButtonLoad
                    isDark={isDark}
                    onClick={() => {
                      setLoad1(false);
                      setLoad2(false);
                    }}
                  >
                    Close...
                  </ButtonLoad>
                </>
              ) : (
                <>
                  {datas.map((data, index) => {
                    if (index < 60) {
                      return <BadgeItem key={index} {...data} />;
                    }
                  })}
                  <ButtonLoad
                    isDark={isDark}
                    onClick={() => {
                      setLoad2(true);
                    }}
                  >
                    Load More...
                  </ButtonLoad>
                </>
              )}
            </>
          ) : (
            <>
              {datas.map((data, index) => {
                if (index < 30) {
                  return <BadgeItem key={index} {...data} />;
                }
              })}
              <ButtonLoad
                isDark={isDark}
                onClick={() => {
                  setLoad1(true);
                }}
              >
                Load More...
              </ButtonLoad>
            </>
          )}
        </>
      )}
    </GridLayOut>
  );
};

export default Badge;

// styled component
const SpinContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 1200px;
  height: 1200px;
`;
