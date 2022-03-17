import React, { useState } from "react";

interface LoginProps {
  setLoginState(b: boolean): void;
  setSignUpState(b: boolean): void;
  setFindIdState(b: boolean): void;
  setFindPwState(b: boolean): void;
}

interface FormData {
  id: string;
  password: string;
}

export const Login = ({
  setLoginState,
  setSignUpState,
  setFindIdState,
  setFindPwState,
}: LoginProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
  });
  const [token, setToken] = useState("");

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
    setLoggedIn(!loggedIn);
    setItem("token", token);
  };

  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  const clickDelete = () => {
    const token = localStorage.getItem("token");
    alert(`SUCCESS Delete Account\n${token}`);
    localStorage.clear();
    setLoggedIn(!loggedIn);
  };
  const clickLogout = () => {
    alert(`LOGOUT & Clear localStorage\n${token}`);
    localStorage.clear();
    setLoggedIn(!loggedIn);
  };

  const clickLogin = () => {
    alert(`SUCCESS LOGIN\n${JSON.stringify(formData)}`);
    setToken(formData.id);
  };
  const click = () => {
    setLoginState(false);
  };
  const clickSignUp = () => {
    click();
    setSignUpState(true);
  };
  const clickFindId = () => {
    click();
    setFindIdState(true);
  };
  const clickFindPw = () => {
    click();
    setFindPwState(true);
  };

  return (
    <>
      <h1>Login Component</h1>
      {loggedIn ? (
        <>
          <h2>now LoggedIn</h2>
          <button onClick={clickDelete}>Delete Account</button>
          <button onClick={clickLogout}>Logout</button>
        </>
      ) : (
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
      )}
    </>
  );
};
