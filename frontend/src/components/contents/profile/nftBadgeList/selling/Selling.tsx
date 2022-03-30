import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { profileState } from "../../../../../recoil/profile";
import { useRecoilValue } from "recoil";
import { SellingCompo } from "./SellingCompo";
import { ButtonLoad } from "../NftBadgeList.style";

export const Selling = () => {
  // recoil
  const { sellingData } = useRecoilValue(profileState);

  // [
  //   {
  //       "editionImage": "사진",
  //       "editionName": "1기",
  //       "artistNickname": "아티스트",
  //       "nftNum": 1,
  //       "nftSeq": "1"
  //   },
  // ]

  return (
    <>
      <SellingCompo />
      <SellingCompo />
      <SellingCompo />
      <SellingCompo />
      <ButtonLoad>Load More...</ButtonLoad>
    </>
  );
};
