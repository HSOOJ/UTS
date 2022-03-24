import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalNickname = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useState

  // input on method
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProfileStateVal({ ...profileStateVal, modifyNickname: value });
  };

  // click button
  const clickModifyNicknameConfirm = () => {
    console.log(
      "confirm nickname duplicate / " + profileStateVal.modifyNickname
    );
  };

  // useEffect

  return (
    <>
      <div>
        <input
          name="userNickname"
          value={profileStateVal.modifyNickname}
          onChange={onChange}
          placeholder="nickname"
        />
        <button onClick={clickModifyNicknameConfirm}>중복 확인</button>
      </div>
    </>
  );
};
