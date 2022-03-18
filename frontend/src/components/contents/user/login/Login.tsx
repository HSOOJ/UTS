import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  userId: string;
  userPwd: string;
}

export const Login = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    userPwd: "",
  });
  const [token, setToken] = useState("");

  // form on method
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
      userId: "",
      userPwd: "",
    });
    setItem("token", token);
  };

  // localstorage.setItem
  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  // click button
  const clickLogin = () => {
    console.log(`SUCCESS LOGIN\n${JSON.stringify(formData)}`);
    setToken(formData.userId);
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
      <h1>Login Component</h1>

      <form onSubmit={onSubmit}>
        <input
          name="userId"
          value={formData.userId}
          onChange={onChange}
          placeholder="ID"
        />
        <input
          name="userPwd"
          value={formData.userPwd}
          onChange={onChange}
          type="password"
          placeholder="PassWord"
        />
        <button onClick={clickLogin}>Login</button>
      </form>
      <button onClick={clickSignUp}>SignUp</button>
      <button onClick={clickFindId}>FindId</button>
      <button onClick={clickFindPw}>FindPw</button>
    </>
  );
};
