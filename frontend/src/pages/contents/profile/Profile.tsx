import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileCompo from "../../../components/contents/profile";
import { profileState } from "../../../recoil/profile";
import { userState } from "../../../recoil/user";

export const Profile = () => {
  // recoil
  const { login } = useRecoilValue(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let navigate = useNavigate();

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    setProfileStateVal({
      ...profileStateVal,
      userNickname: token,
      modalVisible: false,
      modifyNickname: token,
      nftBadgeList: true,
      tradeList: false,
      followList: false,
      ownList: true,
      sellingList: false,
      likeList: false,
    });
  }, []);
  useEffect(() => {
    if (!login) navigate("/user");
  }, [login]);

  return (
    <>
      <ProfileCompo />
    </>
  );
};
