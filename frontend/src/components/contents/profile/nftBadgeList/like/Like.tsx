import { Empty } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
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
  const [empty, setEmpty] = useState(true);
  const [idxLoad, setIdxLoad] = useState(4);

  // Axios
  const AxiosUserLike = (seq: string | null) => {
    axios
      .get("http://uts_url:8080/api/user/likes", {
        params: { userSeq: seq },
      })
      .then((res) => {
        setDatas(res.data.success);
        setEmpty(false);
      })
      .catch((res) => {
        console.log(res);
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
            if (index <= idxLoad) {
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
          {idxLoad >= datas.length ? (
            <ButtonLoad
              isDark={isDark}
              onClick={() => {
                setIdxLoad(4);
                window.scrollTo(0, 0);
              }}
            >
              End
            </ButtonLoad>
          ) : (
            <ButtonLoad isDark={isDark} onClick={() => setIdxLoad(idxLoad + 4)}>
              Load More...
            </ButtonLoad>
          )}
        </>
      )}
    </>
  );
};
