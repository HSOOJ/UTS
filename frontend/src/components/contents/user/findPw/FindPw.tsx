import React, { useState } from "react";

interface FindPwProps {
  setLoginState(b: boolean): void;
  setFindPwState(b: boolean): void;
}

interface FormData {
  walletAddr: string;
  email: string;
}

export const FindPw = ({ setLoginState, setFindPwState }: FindPwProps) => {
  const [formData, setFormData] = useState<FormData>({
    walletAddr: "",
    email: "",
  });

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
    console.log(formData);
    setFormData({
      walletAddr: "",
      email: "",
    });
    clickBack();
  };

  const clickBack = () => {
    setLoginState(true);
    setFindPwState(false);
  };
  const clickFindPw = () => {
    alert(`SUCCESS FindPw\n${JSON.stringify(formData)}`);
  };

  return (
    <>
      <h1>FindPw Component</h1>
      <form onSubmit={onSubmit}>
        <input
          name="walletAddr"
          value={formData.walletAddr}
          onChange={onChange}
          placeholder="wallet address"
        />
        <input
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="email"
        />
        <button onClick={clickFindPw}>FindPw</button>
      </form>
      <button onClick={clickBack}>Back</button>
    </>
  );
};
