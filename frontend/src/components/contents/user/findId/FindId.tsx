import React, { useState } from "react";

interface FindIdProps {
  setLoginState(b: boolean): void;
  setFindIdState(b: boolean): void;
}

interface FormData {
  walletAddr: string;
}

export const FindId = ({ setLoginState, setFindIdState }: FindIdProps) => {
  const [formData, setFormData] = useState<FormData>({
    walletAddr: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      walletAddr: "",
    });
    clickBack();
  };

  const clickBack = () => {
    setLoginState(true);
    setFindIdState(false);
  };
  const clickFindId = () => {
    alert(`SUCCESS FindId\n${JSON.stringify(formData)}`);
  };

  return (
    <>
      <h1>FindId Component</h1>
      <form onSubmit={onSubmit}>
        <input
          name="walletAddr"
          value={formData.walletAddr}
          onChange={onChange}
          placeholder="wallet address"
        />
        <button onClick={clickFindId}>FindId</button>
      </form>
      <button onClick={clickBack}>Back</button>
    </>
  );
};
