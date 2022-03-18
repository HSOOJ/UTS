import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  userId: string;
  userPwd: string;
  userNickname: string;
  userWalletAddress: string;
}

export const SignUp = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    userPwd: "",
    userNickname: "",
    userWalletAddress: "",
  });

  // form on method
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      userId: "",
      userPwd: "",
      userNickname: "",
      userWalletAddress: "",
    });
    clickBack();
  };

  // click button
  const clickBack = () => {
    setUserStateVal({ ...userStateVal, loginForm: true, signUp: false });
  };
  const clickCheckWallet = () => {
    console.log(
      `Check Wallet Address\n${JSON.stringify(formData.userWalletAddress)}`
    );
  };
  const clickSignUp = () => {
    console.log(
      `If you're Artist visit this site and submit your portfolio!!\nwww.naver.com\n${JSON.stringify(
        formData
      )}`
    );
  };

  return (
    <>
      <h1>SignUp Component</h1>
      <form onSubmit={onSubmit}>
        <input
          name="userId"
          value={formData.userId}
          onChange={onChange}
          placeholder="email"
        />
        <input
          name="userPwd"
          value={formData.userPwd}
          type="password"
          onChange={onChange}
          placeholder="password"
        />
        <input
          name="userNickname"
          value={formData.userNickname}
          onChange={onChange}
          placeholder="nickname"
        />
        <input
          name="userWalletAddress"
          value={formData.userWalletAddress}
          onChange={onChange}
          placeholder="wallet address"
        />
        <button onClick={clickSignUp}>SignUp</button>
      </form>
      <button onClick={clickCheckWallet}>Check Wallet Address</button>
      <button onClick={clickBack}>Back</button>
    </>
  );
};
