import { Avatar, Button, List } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import VirtualList from "rc-virtual-list";
import { OwnCompo } from "./OwnCompo";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import styled from "styled-components";
import { ButtonLoad } from "../NftBadgeList.style";

export const Own = () => {
  // recoil
  const { ownData } = useRecoilValue(profileState);
  const [load, setLoad] = useState(false);
  // [
  //   {
  //       "editionImage": "123",
  //       "editionName": "counting2",
  //       "artistNickname": "유싸피",
  //       "nftNum": 1,
  //       "nftSeq": "6"
  //   },
  // ]

  return (
    <>
      <OwnCompo />
      <OwnCompo />
      <OwnCompo />
      <OwnCompo />
      {load ? (
        <>
          <OwnCompo />
          <OwnCompo />
          <OwnCompo />
          <OwnCompo />
        </>
      ) : null}
      <ButtonLoad onClick={() => setLoad(!load)}>Load More...</ButtonLoad>
    </>
  );
};
