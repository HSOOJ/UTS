import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";
import { ethers } from "ethers";

interface FormData {
  userId: string;
  userPwd: string;
}

declare let window: any;

export const Login = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // useState
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    userPwd: "",
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
  const clickLogin = async () => {
    console.log(`SUCCESS LOGIN\n${JSON.stringify(formData)}`);
    setFormData({
      userId: "",
      userPwd: "",
    });
    localStorage.setItem("token", formData.userId);
    setUserStateVal({ ...userStateVal, login: true, loginForm: false });
  };

  const metamaskLogin = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const balance = await provider.getBalance(signer.getAddress());
      window.localStorage.setItem(
        "userAccount",
        JSON.stringify(await signer.getAddress())
      );
      console.log("Account:", await signer.getAddress());
      setUserStateVal({ ...userStateVal, login: true, loginForm: false });
    } catch (err) {
      alert("Metamask 연결이 필요합니다!");
    }
  };
  const clickSignUp = () => {
    setUserStateVal({ ...userStateVal, loginForm: false, signUp: true });
  };
  const clickFindId = () => {
    setUserStateVal({ ...userStateVal, loginForm: false, findId: true });
  };
  const clickFindPw = () => {
    setUserStateVal({ ...userStateVal, loginForm: false, findPw: true });
  };

  return (
    <>
      <h1>Login Form</h1>

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
          onChange={onChange}
          type="password"
          placeholder="password"
        />
        <button type="button" onClick={clickLogin}>
          Login
        </button>
      </form>
      <div>
        <img width="50px" src="img/metamask.svg" alt="meta mask logo" />
        <button onClick={metamaskLogin}>Connect to MetaMask</button>
      </div>
      <button onClick={clickSignUp}>SignUp</button>
      <button onClick={clickFindId}>FindId</button>
      <button onClick={clickFindPw}>FindPw</button>
    </>
  );
};
