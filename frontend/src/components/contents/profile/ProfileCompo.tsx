import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../recoil/profile";
import FollowList from "./followList";
import ModifyModal from "./modify";
import NftBadgeList from "./nftBadgeList";
import TradeList from "./tradeList";

export const ProfileCompo = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useState
  const [nickname, setNickname] = useState("");

  // function

  // click button
  const clickModify = () => {
    console.log("open modify compo");
    setProfileStateVal({ ...profileStateVal, modifyModal: true });
  };
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    setNickname(token);
  }, []);

  // styled component

  return (
    <>
      <h1>ProfileCompo</h1>
      <hr />
      <h1>{nickname}님의 컬렉션</h1>
      <button onClick={clickModify}>수정</button>
      <button onClick={clickAddr}>내 지갑 주소 보기</button>
      <button onClick={clickRegist}>아티스트 등록하기</button>

      {profileStateVal.modifyModal ? <ModifyModal /> : null}

      <hr />
      <button onClick={clickNftBadgeList}>NFT 뱃지</button>
      <button onClick={clickTradeList}>거래 내역</button>
      <button onClick={clickfollowList}>팔로잉</button>
      <hr />
      {profileStateVal.nftBadgeList ? <NftBadgeList /> : null}
      {profileStateVal.tradeList ? <TradeList /> : null}
      {profileStateVal.followList ? <FollowList /> : null}
    </>
  );
};
