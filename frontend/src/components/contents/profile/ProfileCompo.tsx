import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { profileState } from "../../../recoil/profile";
import { userState } from "../../../recoil/user";
import FollowList from "./followList";
import ModifyModal from "./modify";
import NftBadgeList from "./nftBadgeList";
import TradeList from "./tradeList";

export const ProfileCompo = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // router navigate
  let navigate = useNavigate();

  // useState

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setProfileStateVal({ ...profileStateVal, userNickname: token });
    } else {
      navigate("/user");
    }
  }, [userStateVal.login]);

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
  const clickLogout = () => {
    console.log(`LOGOUT & Clear localStorage\n${profileStateVal.userNickname}`);
    localStorage.clear();
    setUserStateVal({ ...userStateVal, login: false });
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

  // styled component

  return (
    <>
      <h1>ProfileCompo</h1>
      <hr />
      <h1>{profileStateVal.userNickname}님의 컬렉션</h1>
      <button onClick={clickModify}>수정</button>
      <button onClick={clickAddr}>내 지갑 주소 보기</button>
      <button onClick={clickRegist}>아티스트 등록하기</button>
      <button onClick={clickLogout}>Logout</button>

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
