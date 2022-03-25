import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import { ModifyModalDelete } from "./modifyModalDelete/ModifyModalDelete";
import ModifyModalNickname from "./modifyModalNickname";
import { Popover, Button, Modal, Popconfirm } from "antd";
import { useState } from "react";
import { userState } from "../../../../recoil/user";
import ModifyModalPic from "./modifyModalPic";

export const ModifyModal = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // function
  const handleCancel = () => {
    setProfileStateVal({ ...profileStateVal, modalVisible: false });
  };

  // click button _ modify
  const clickModifyDelete = () => {
    console.log(`SUCCESS Delete Account\n${profileStateVal.userNickname}`);
    localStorage.removeItem("token");
    setUserStateVal({ ...userStateVal, login: false });
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

  // click button

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
          >
            <Button danger>회원탈퇴</Button>
          </Popconfirm>,
          <Button
            type="primary"
            loading={profileStateVal.modalLoading}
            onClick={clickModifyNicknameChange}
          >
            수정하기
          </Button>,
        ]}
      >
        <ModifyModalPic />
        <ModifyModalNickname />
      </Modal>
    </>
  );
};
