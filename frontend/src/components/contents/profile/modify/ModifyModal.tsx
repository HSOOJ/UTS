import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import { ModifyModalDelete } from "./modifyModalDelete/ModifyModalDelete";
import ModifyModalNickname from "./modifyModalNickname";
import { Popover, Button, Modal, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { userState } from "../../../../recoil/user";
import ModifyModalPic from "./modifyModalPic";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ModifyModal = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useNavigate
  const naviagate = useNavigate();

  // Axios
  const PutWidthdraw = (userSeq: string | null) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/withdraw", {
        userSeq,
      })
      .then((res) => {
        console.log(`SUCCESS Delete Account\n${profileStateVal.userNickname}`);
        localStorage.removeItem("userAccount");
        localStorage.removeItem("userSeq");
        setUserStateVal({ ...userStateVal, login: false });
        setProfileStateVal({
          ...profileStateVal,
          modalVisible: false,
        });
        naviagate("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // function
  const handleCancel = () => {
    setProfileStateVal({ ...profileStateVal, modalVisible: false });
  };

  // click button _ modify
  const clickModifyDelete = () => {
    let userSeq = localStorage.getItem("userSeq");
    PutWidthdraw(userSeq);
  };
  const clickModifyNicknameChange = () => {
    console.log("change nickname / " + profileStateVal.modifyNickname);
    setProfileStateVal({
      ...profileStateVal,
      modalLoading: true,
    });
    setTimeout(() => {
      setProfileStateVal({
        ...profileStateVal,
        modalLoading: false,
        modalVisible: false,
        userNickname: profileStateVal.modifyNickname,
      });
      localStorage.setItem("token", profileStateVal.modifyNickname);
    }, 1500);
  };

  return (
    <>
      <Modal
        visible={profileStateVal.modalVisible}
        title="프로필 수정"
        centered
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            title="정말로 탈퇴하시겠습니까?"
            onConfirm={clickModifyDelete}
            okText="네"
            cancelText="아니요"
            key="0"
          >
            <Button danger>회원탈퇴</Button>
          </Popconfirm>,
          <Button
            type="primary"
            loading={profileStateVal.modalLoading}
            onClick={clickModifyNicknameChange}
            key="1"
          >
            수정하기
          </Button>,
        ]}
      >
        <ModifyModalPic key="0" />

        <ModifyModalNickname key="1" />
      </Modal>
    </>
  );
};
