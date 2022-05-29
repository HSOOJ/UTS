import { useEffect, useState } from "react";
import { FollowListCompo } from "./FollowListCompo";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { Empty } from "antd";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../recoil/profile";
import { ButtonLoad } from "../nftBadgeList/NftBadgeList.style";
import { themeAtom } from "../../../../../src/recoil/theme";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const FollowList = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const { clickProfile } = useRecoilValue(profileState);

  // useParams
  const { userSeq } = useParams() as ProfileParamTypes;

  // useState
  const [datas, setDatas] = useState([
    {
      following: "n",
      userNickname: "아티스트",
      userProfileImage: "https://picsum.photos/500/500",
      userSeq: "2",
      artistSeq: "1",
    },
  ]);
  const [empty, setEmpty] = useState(true);
  const [idxLoad, setIdxLoad] = useState(4);

  // Axios
  const GetFollowList = (
    myUserSeq: string | null,
    profileUserSeq: string | null
  ) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/followings", {
        params: { myUserSeq, profileUserSeq },
      })
      .then((res) => {
        // console.log(res.data.success);
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
  useEffect(() => {
    let myUserSeq = localStorage.getItem("userSeq");
    if (myUserSeq === null || myUserSeq === undefined) myUserSeq = userSeq;
    GetFollowList(myUserSeq, userSeq);
  }, [clickProfile]);

  return (
    <>
      {empty ? (
        <Empty />
      ) : (
        <>
          {datas.map((data, index) => {
            if (index <= idxLoad) {
              return (
                <FollowListCompo
                  key={index}
                  following={data.following}
                  userNickname={data.userNickname}
                  userProfileImage={data.userProfileImage}
                  userSeq={data.userSeq}
                  artistSeq={data.artistSeq}
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
