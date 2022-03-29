import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../recoil/profile";
import FollowList from "./followList";
import ModifyModal from "./modify";
import NftBadgeList from "./nftBadgeList";
import TradeList from "./tradeList";
import { Popover, Button, Modal, Popconfirm } from "antd";
import { userState } from "../../../recoil/user";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const ProfileCompo = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  const { userSeq } = useParams() as ProfileParamTypes;

  // useState
  const [modifyBool, setModifyBool] = useState(true);

  // function _ modal
  const showModal = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalVisible: true,
    });
  };
  const AxiosUserInfo = (seq: string | null) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/info", {
        params: { userSeq: seq },
      })
      .then((res) => {
        console.log(res.data);
        setProfileStateVal({
          ...profileStateVal,
          userNickname: res.data.success.userNickname,
          modifyNickname: res.data.success.userNickname,
          userProfileImage: res.data.success.userProfileImage,
        });
      })
      .catch((res) => {
        console.log(res);
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
  useEffect(() => {
    AxiosUserInfo(userSeq);
  }, []);
  useEffect(() => {
    console.log("clickProfile useEffect watch");
    AxiosUserInfo(userSeq);
    if (userSeq === localStorage.getItem("userSeq")) {
      setModifyBool(true);
    } else {
      setModifyBool(false);
    }
  }, [profileStateVal.clickProfile]);

  return (
    <>
      <h1>ProfileCompo</h1>
      <hr />
      <Container>
        <ImageContainer>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </ImageContainer>
        <h1>{profileStateVal.userNickname}님의 컬렉션</h1>

        {modifyBool ? (
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
      </Container>
    </>
  );
};

// styled-component
const Container = styled.div`
  overflow: hidden;
  text-align: center;
`;
const ImageContainer = styled.div`
  margin: 0 16px;
  padding: 1em;
`;
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;
