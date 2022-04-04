import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../../recoil/profile";
import FollowList from "./followList";
import ModifyModal from "./modify";
import NftBadgeList from "./nftBadgeList";
import TradeList from "./tradeList";
import { Popover, Button, Modal, Popconfirm, Alert } from "antd";
import { userState } from "../../../recoil/user";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  ButtonModify,
  ButtonSelect,
  Container,
  Image,
  ImageContainer,
  ProfileContainerInfo,
  ProfileContainerModify,
  TextMain,
} from "./Profile.style";
import { themeAtom } from "../../../recoil/theme";

interface ProfileParamTypes extends Params {
  userSeq: string;
}

export const ProfileCompo = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);
  const isDark = useRecoilValue(themeAtom).isDark;

  // useParams
  const { userSeq } = useParams() as ProfileParamTypes;

  // useState
  const [modifyBool, setModifyBool] = useState(true);
  const [showAddr, SetShowAddr] = useState(false);

  // function _ modal
  const showModal = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalVisible: true,
    });
  };

  // Axios
  const AxiosUserInfo = (seq: string | null) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/info", {
        params: { userSeq: seq },
      })
      .then((res) => {
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
    SetShowAddr(!showAddr);
  };
  const clickRegist = () => {
    window.open("https://forms.gle/KJUHZF2AWpHVT1z29");
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
    AxiosUserInfo(userSeq);
    if (userSeq === localStorage.getItem("userSeq")) {
      setModifyBool(true);
    } else {
      setModifyBool(false);
    }
  }, [profileStateVal.clickProfile]);

  return (
    <>
      <Container>
        <ProfileContainerModify>
          <ImageContainer>
            <Image src={profileStateVal.userProfileImage} />
          </ImageContainer>
          <TextMain>{profileStateVal.userNickname}님의 컬렉션</TextMain>
        </ProfileContainerModify>
        <ProfileContainerModify>
          {modifyBool ? (
            <>
              <ButtonModify isDark={isDark} onClick={clickAddr}>
                내 지갑 주소 보기
              </ButtonModify>
              <ButtonModify isDark={isDark} onClick={clickRegist}>
                아티스트 등록하기
              </ButtonModify>
              <ButtonModify isDark={isDark} onClick={showModal}>
                수정
              </ButtonModify>
              {profileStateVal.modalVisible ? <ModifyModal /> : null}
            </>
          ) : null}
        </ProfileContainerModify>
        {showAddr ? (
          <Alert
            message={profileStateVal.userWallet}
            type="info"
            showIcon
            closable
            onClose={() => {
              SetShowAddr(false);
            }}
          />
        ) : null}
        <ProfileContainerInfo>
          <ButtonSelect
            isDark={isDark}
            isSelected={profileStateVal.nftBadgeList}
            onClick={clickNftBadgeList}
          >
            NFT 뱃지
          </ButtonSelect>
          <ButtonSelect
            isDark={isDark}
            isSelected={profileStateVal.tradeList}
            onClick={clickTradeList}
          >
            거래 내역
          </ButtonSelect>
          <ButtonSelect
            isDark={isDark}
            isSelected={profileStateVal.followList}
            onClick={clickfollowList}
          >
            팔로잉
          </ButtonSelect>
        </ProfileContainerInfo>
        {profileStateVal.nftBadgeList ? <NftBadgeList /> : null}
        {profileStateVal.tradeList ? <TradeList /> : null}
        {profileStateVal.followList ? <FollowList /> : null}
      </Container>
    </>
  );
};
