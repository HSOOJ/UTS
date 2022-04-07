import { Empty } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import { ButtonLoad } from "../NftBadgeList.style";
import { NftBadgeListCompo } from "../NftBadgeListCompo";
import { themeAtom } from "../../../../../recoil/theme";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const Own = () => {
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
    },
  ]);
  const [empty, setEmpty] = useState(true);
  const [idxLoad, setIdxLoad] = useState(4);

  // Axios
  const AxiosUserNft = (seq: string | null) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/nfts", {
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
  useEffect(() => AxiosUserNft(userSeq), [clickProfile]);

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
