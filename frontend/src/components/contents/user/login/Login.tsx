import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  userId: string;
  userPwd: string;
}

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
  const clickLogin = () => {
    console.log(`SUCCESS LOGIN\n${JSON.stringify(formData)}`);
    setFormData({
      userId: "",
      userPwd: "",
    });
    localStorage.setItem("token", formData.userId);
    setUserStateVal({ ...userStateVal, login: true, loginForm: false });
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
      <button onClick={clickSignUp}>SignUp</button>
      <button onClick={clickFindId}>FindId</button>
      <button onClick={clickFindPw}>FindPw</button>
    </>
  );
};
