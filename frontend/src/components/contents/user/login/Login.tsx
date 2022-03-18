import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/user";

interface FormData {
  id: string;
  password: string;
}

export const Login = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
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
      id: "",
      password: "",
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
    setToken(formData.id);
    setUserStateVal({ ...userStateVal, login: true });
  };
  const clickSignUp = () => {
    setUserStateVal({ ...userStateVal, signUp: true });
  };
  const clickFindId = () => {
    setUserStateVal({ ...userStateVal, findId: true });
  };
  const clickFindPw = () => {
    setUserStateVal({ ...userStateVal, findPw: true });
  };

  return (
    <>
      <h1>Login Component</h1>
      <>
        <form onSubmit={onSubmit}>
          <input
            name="id"
            value={formData.id}
            onChange={onChange}
            placeholder="ID"
          />
          <input
            name="password"
            value={formData.password}
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
    </>
  );
};
