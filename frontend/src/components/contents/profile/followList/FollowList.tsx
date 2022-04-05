import { useEffect, useState } from "react";
import { FollowListCompo } from "./FollowListCompo";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { Empty } from "antd";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../recoil/profile";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const FollowList = () => {
  // recoil
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
        console.log(res.data.success);
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
      {empty ? <Empty /> : null}
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
    </>
  );
};
