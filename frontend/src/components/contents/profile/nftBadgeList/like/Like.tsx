import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import { LikeCompo } from "./LikeCompo";
import { ButtonLoad } from "../NftBadgeList.style";

export const Like = () => {
  // recoil
  const { likeData } = useRecoilValue(profileState);

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

  return (
    <>
      <LikeCompo />
      <LikeCompo />
      <LikeCompo />
      <LikeCompo />
      <ButtonLoad>Load More...</ButtonLoad>
    </>
  );
};
