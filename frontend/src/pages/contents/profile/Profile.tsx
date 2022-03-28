import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileCompo from "../../../components/contents/profile";
import { profileState } from "../../../recoil/profile";
import { userState } from "../../../recoil/user";

interface ProfileParamTypes extends Params {
  walletAddress: string;
}

export const Profile = () => {
  // recoil
  const { login } = useRecoilValue(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // 현재 walletAddress 잡아내기
  const { walletAddress } = useParams() as ProfileParamTypes;

  // useEffect
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token === null) return;
    setProfileStateVal({
      ...profileStateVal,
      userNickname: "",
      modifyNickname: "",
      modalVisible: false,
      nftBadgeList: true,
      tradeList: false,
      followList: false,
      ownList: true,
      sellingList: false,
      likeList: false,
    });
  }, []);
  useEffect(() => {
    if (walletAddress === profileStateVal.userWallet) {
      setProfileStateVal({ ...profileStateVal, modifyVisible: true });
    } else {
      setProfileStateVal({ ...profileStateVal, modifyVisible: false });
    }
  }, [profileStateVal.clickProfile]);

  return (
    <>
      <ProfileCompo />
    </>
  );
};
