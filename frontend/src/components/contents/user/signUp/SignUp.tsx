import { useState } from "react";

interface SignUpProps {
  setLoginState(b: boolean): void;
  setSignUpState(b: boolean): void;
}

interface FormData {
  email: string;
  password: string;
  nickname: string;
  walletAddr: string;
}

export const SignUp = ({ setLoginState, setSignUpState }: SignUpProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    nickname: "",
    walletAddr: "",
  });

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
      email: "",
      password: "",
      nickname: "",
      walletAddr: "",
    });
    clickBack();
  };

  const clickBack = () => {
    setLoginState(true);
    setSignUpState(false);
  };
  const clickCheckWallet = () => {
    alert(`Check Wallet Address\n${JSON.stringify(formData.walletAddr)}`);
  };
  const clickSignUp = () => {
    alert(
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
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="email"
        />
        <input
          name="password"
          value={formData.password}
          type="password"
          onChange={onChange}
          placeholder="password"
        />
        <input
          name="nickname"
          value={formData.nickname}
          onChange={onChange}
          placeholder="nickname"
        />
        <input
          name="walletAddr"
          value={formData.walletAddr}
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
