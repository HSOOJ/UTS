import { Avatar, List, Empty } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import { LikeCompo } from "./LikeCompo";
import { ButtonLoad } from "../NftBadgeList.style";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import { NftBadgeListCompo } from "../NftBadgeListCompo";
import { themeAtom } from "../../../../../recoil/theme";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const Like = () => {
  // [
  //   {
  //       "editionImage": "사진",
  //       "editionName": "1기",
  //       "artistNickname": "아티스트",
  //       "nftNum": 1,
  //       "nftSeq": "1",
  //       "likes": 2
  //   }
  // ]
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const { clickProfile } = useRecoilValue(profileState);

  // params
  const { userSeq } = useParams() as ProfileParamTypes;

  // useState
  const [datas, setDatas] = useState([
    {
      artistNickname: "유싸피",
      editionImage: "https://picsum.photos/500/500",
      editionName: "counting2",
      nftNum: "1",
      nftSeq: "6",
      likes: "",
    },
  ]);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [empty, setEmpty] = useState(true);

  // Axios
  const AxiosUserLike = (seq: string | null) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/likes", {
        params: { userSeq: seq },
      })
      .then((res) => {
        setDatas(res.data.success);
        setEmpty(false);
      })
      .catch((res) => {
        setDatas([]);
        setEmpty(true);
      });
  };

  // useEffect
  useEffect(() => AxiosUserLike(userSeq), [clickProfile]);

  return (
    <>
      {empty ? (
        <Empty />
      ) : (
        <>
          {datas.map((data, index) => {
            if (index < 5) {
              return (
                <NftBadgeListCompo
                  key={index}
                  artistNickname={data.artistNickname}
                  editionImage={data.editionImage}
                  editionName={data.editionName}
                  nftNum={data.nftNum}
                  nftSeq={data.nftSeq}
                  likes={data.likes}
                />
              );
            }
          })}
          {load1 ? null : (
            <ButtonLoad isDark={isDark} onClick={() => setLoad1(true)}>
              Load More...
            </ButtonLoad>
          )}
          {load1 ? (
            <>
              {datas.map((data, index) => {
                if (index <= 5 && index < 10) {
                  return (
                    <NftBadgeListCompo
                      key={index}
                      artistNickname={data.artistNickname}
                      editionImage={data.editionImage}
                      editionName={data.editionName}
                      nftNum={data.nftNum}
                      nftSeq={data.nftSeq}
                      likes={data.likes}
                    />
                  );
                }
              })}
              {load2 ? null : (
                <ButtonLoad isDark={isDark} onClick={() => setLoad2(true)}>
                  Load More...
                </ButtonLoad>
              )}
              {load2 ? (
                <>
                  {datas.map((data, index) => {
                    if (index <= 10) {
                      return (
                        <NftBadgeListCompo
                          key={index}
                          artistNickname={data.artistNickname}
                          editionImage={data.editionImage}
                          editionName={data.editionName}
                          nftNum={data.nftNum}
                          nftSeq={data.nftSeq}
                          likes={data.likes}
                        />
                      );
                    }
                  })}
                </>
              ) : null}
            </>
          ) : null}
          {load1 && load2 ? (
            <ButtonLoad
              isDark={isDark}
              onClick={() => {
                setLoad1(false);
                setLoad2(false);
              }}
            >
              Close...
            </ButtonLoad>
          ) : null}
        </>
      )}
    </>
  );
};
