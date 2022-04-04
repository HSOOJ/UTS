import { Alert, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalNickname = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useState
  const [success, SetSuccess] = useState(false);
  const [warning, SetWarning] = useState(false);

  // Axios
  const GetCheckNickname = (userNickname: string) => {
    axios
      .get("http://j6a105.p.ssafy.io:8080/api/user/check/nickname", {
        params: { userNickname },
      })
      .then(() => {
        console.log(
          "confirm nickname duplicate / " + profileStateVal.modifyNickname
        );
        SetSuccess(true);
      })
      .catch((res) => {
        console.log(res);
        SetWarning(true);
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
  useEffect(() => {
    setProfileStateVal({
      ...profileStateVal,
      modifyNickname: profileStateVal.userNickname,
    });
  }, []);

  return (
    <>
      <div>
        <input
          name="userNickname"
          value={profileStateVal.modifyNickname}
          onChange={onChange}
          placeholder="nickname"
        />
        <Button onClick={clickModifyNicknameConfirm}>중복 확인</Button>
        {success ? (
          <Alert
            message="사용가능한 닉네임입니다."
            type="success"
            showIcon
            closable
            onClose={() => {
              SetSuccess(false);
            }}
          />
        ) : null}
        {warning ? (
          <Alert
            message="이미 사용중인 닉네임입니다."
            type="warning"
            showIcon
            closable
            onClose={() => {
              SetWarning(false);
            }}
          />
        ) : null}
      </div>
    </>
  );
};
