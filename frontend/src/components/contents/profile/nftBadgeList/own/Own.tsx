import { Avatar, Button, Empty, List } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import VirtualList from "rc-virtual-list";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import styled from "styled-components";
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
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [empty, setEmpty] = useState(true);

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
            if (index < 5) {
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
