import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import { ModifyModalDelete } from "./modifyModalDelete/ModifyModalDelete";
import ModifyModalNickname from "./modifyModalNickname";
import { Popover, Button } from "antd";
import { useState } from "react";

export const ModifyModal = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // function
  const handleVisibleChange = (vis: boolean) => {};

  // click button
  const clickModalModifyPic = () => {
    console.log("modify profile pic");
  };
  const clickModalModifyNickname = () => {
    console.log("modify nickname");
    setProfileStateVal({ ...profileStateVal, modifyModalNickname: true });
  };
  const clickModalModifyDelete = () => {
    console.log("delete account");
    setProfileStateVal({
      ...profileStateVal,
      modifyModalDelete: true,
    });
  };

  return (
    <>
      <button onClick={clickModalModifyPic}>프로필 사진 수정</button>
      <Popover
        placement="rightTop"
        content={<ModifyModalNickname />}
        title="닉네임 수정"
        trigger="click"
        visible={profileStateVal.modifyModalNickname}
        onVisibleChange={(visible: boolean) => {
          setProfileStateVal({
            ...profileStateVal,
            modifyModalNickname: visible,
          });
        }}
      >
        <button onClick={clickModalModifyNickname}>닉네임 수정</button>
      </Popover>
      <Popover
        placement="rightTop"
        content={<ModifyModalDelete />}
        title="회원 탈퇴"
        trigger="click"
        visible={profileStateVal.modifyModalDelete}
        onVisibleChange={(visible: boolean) => {
          setProfileStateVal({
            ...profileStateVal,
            modifyModalDelete: visible,
          });
        }}
      >
        <button onClick={clickModalModifyDelete}>회원탈퇴</button>
      </Popover>
    </>
  );
};
