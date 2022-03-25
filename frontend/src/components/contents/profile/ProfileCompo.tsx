import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../recoil/profile";
import FollowList from "./followList";
import ModifyModal from "./modify";
import NftBadgeList from "./nftBadgeList";
import TradeList from "./tradeList";
import { Popover, Button, Modal, Popconfirm, Image } from "antd";
import { userState } from "../../../recoil/user";
import { Params, useParams } from "react-router-dom";

interface ProfileParamTypes extends Params {
  walletAddress: string;
}

export const ProfileCompo = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  const { walletAddress } = useParams() as ProfileParamTypes;

  // useState

  // function _ modal
  const showModal = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalVisible: true,
    });
  };

  // click button
  const clickAddr = () => {
    console.log("Check Wallet Address");
  };
  const clickRegist = () => {
    console.log("click Artist Regist Button");
  };
  const clickNftBadgeList = () => {
    setProfileStateVal({
      ...profileStateVal,
      nftBadgeList: true,
      tradeList: false,
      followList: false,
    });
  };
  const clickTradeList = () => {
    setProfileStateVal({
      ...profileStateVal,
      nftBadgeList: false,
      tradeList: true,
      followList: false,
    });
  };
  const clickfollowList = () => {
    setProfileStateVal({
      ...profileStateVal,
      nftBadgeList: false,
      tradeList: false,
      followList: true,
    });
  };

  // useEffect

  return (
    <>
      <h1>ProfileCompo</h1>
      <hr />
      <div>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <h1>{walletAddress}님의 컬렉션</h1>
      </div>
      {profileStateVal.modifyVisible ? (
        <>
          <button onClick={clickAddr}>내 지갑 주소 보기</button>
          <button onClick={clickRegist}>아티스트 등록하기</button>
          <Button type="primary" onClick={showModal}>
            수정
          </Button>
          {profileStateVal.modalVisible ? <ModifyModal /> : null}
        </>
      ) : null}

      <hr />
      <button onClick={clickNftBadgeList}>NFT 뱃지</button>
      <button onClick={clickTradeList}>거래 내역</button>
      <button onClick={clickfollowList}>팔로잉</button>
      <hr />
      {/* {profileStateVal.nftBadgeList ? <NftBadgeList /> : null}
      {profileStateVal.tradeList ? <TradeList /> : null}
      {profileStateVal.followList ? <FollowList /> : null} */}
    </>
  );
};
