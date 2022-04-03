import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalNickname = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useState

  // Axios
  const GetCheckNickname = (userNickname: string) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/check/nickname", {
        params: { userNickname },
      })
      .then((res) => {
        console.log(res.data.success);
        console.log(
          "confirm nickname duplicate / " + profileStateVal.modifyNickname
        );
      })
      .catch((res) => {
        console.log("Duplicate Nickname!!!");
      });
  };

  // input on method
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProfileStateVal({ ...profileStateVal, modifyNickname: value });
  };

  // click button
  const clickModifyNicknameConfirm = () => {
    GetCheckNickname(profileStateVal.modifyNickname);
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
