import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  userWalletAddress: string;
}

export const FindId = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [formData, setFormData] = useState<FormData>({
    userWalletAddress: "",
  });

  // form on method
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // click button
  const clickBack = () => {
    setUserStateVal({ ...userStateVal, loginForm: true, findId: false });
  };
  const clickFindId = () => {
    console.log(`SUCCESS FindId\n${JSON.stringify(formData)}`);
    setFormData({
      userWalletAddress: "",
    });
    clickBack();
  };

  return (
    <>
      <h1>FindId Form</h1>
      <form onSubmit={onSubmit}>
        <input
          name="userWalletAddress"
          value={formData.userWalletAddress}
          onChange={onChange}
          placeholder="wallet address"
        />
        <button type="button" onClick={clickFindId}>
          FindId
        </button>
      </form>
      <button onClick={clickBack}>Back</button>
    </>
  );
};
