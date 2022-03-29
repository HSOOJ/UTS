import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileCompo from "../../../components/contents/profile";
import { profileState } from "../../../recoil/profile";
import { userState } from "../../../recoil/user";

export const Profile = () => {
  // recoil
  const { login } = useRecoilValue(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

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

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <ProfileCompo />
        </Col>
      </Row>
    </>
  );
};
