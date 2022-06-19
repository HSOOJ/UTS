import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  userWalletAddress: string;
  userId: string;
}

export const FindPw = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [formData, setFormData] = useState<FormData>({
    userWalletAddress: "",
    userId: "",
  });

  // form on method
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // click button
  const clickBack = () => {
    setUserStateVal({ ...userStateVal, loginForm: true, findPw: false });
  };
  const clickFindPw = () => {
    console.log(`SUCCESS FindPw\n${JSON.stringify(formData)}`);
    setFormData({
      userWalletAddress: "",
      userId: "",
    });
    clickBack();
  };

  return (
    <>
      <h1>FindPw Form</h1>
      <form onSubmit={onSubmit}>
        <input
          name="userWalletAddress"
          value={formData.userWalletAddress}
          onChange={onChange}
          placeholder="wallet address"
        />
        <input
          name="userId"
          value={formData.userId}
          onChange={onChange}
          placeholder="email"
        />
        <button type="button" onClick={clickFindPw}>
          FindPw
        </button>
      </form>
      <button onClick={clickBack}>Back</button>
    </>
  );
};
