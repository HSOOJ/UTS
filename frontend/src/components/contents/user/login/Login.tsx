import { useState } from "react";

interface LoginProps {
  setLoginState(b: boolean): void
  setSignUpState(b: boolean): void
  setFindIdState(b: boolean): void
  setFindPwState(b: boolean): void
}

export const Login = ({setLoginState, setSignUpState, setFindIdState, setFindPwState}: LoginProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const clickLogin = () => {
    setLoggedIn(!loggedIn)
  }
  const click = () => {
    setLoginState(false);
  }
  const clickSignUp = () => {
      click()
      setSignUpState(true)
  }
  const clickFindId = () => {
      click()
      setFindIdState(true)
  }
  const clickFindPw = () => {
      click()
      setFindPwState(true)
  }

  return(
    <>
      <h1>Login Component</h1>
      {loggedIn ?
      <>
      <h2>now LoggedIn</h2><button onClick={clickLogin}>Logout</button>
      </> 
      :
      <>
      <button onClick={clickLogin}>Login</button>
      <button onClick={clickSignUp}>SignUp</button>
      <button onClick={clickFindId}>FindId</button>
      <button onClick={clickFindPw}>FindPw</button>
      </>}
    </>
  )
};
  