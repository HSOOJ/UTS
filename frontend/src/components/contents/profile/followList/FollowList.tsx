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
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [empty, setEmpty] = useState(true);

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
          {load1 || load2 ? (
            <>
              {load2 ? (
                <>
                  {datas.map((data, index) => {
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
                    if (index < 10) {
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
                  <ButtonLoad isDark={isDark} onClick={() => setLoad2(true)}>
                    Load More...
                  </ButtonLoad>
                </>
              )}
            </>
          ) : (
            <>
              {datas.map((data, index) => {
                if (index < 5) {
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
              <ButtonLoad isDark={isDark} onClick={() => setLoad1(true)}>
                Load More...
              </ButtonLoad>
            </>
          )}
        </>
      )}
      {/* {datas.map((data, index) => {
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
      })} */}
    </>
  );
};
