import { useState } from "react";
import Login from "../../../components/contents/user/login";
import SignUp from "../../../components/contents/user/signUp";
import FindId from "../../../components/contents/user/findId";
import FindPw from "../../../components/contents/user/findPw";

export const User = () => {
  const [loginState, setLoginState] = useState(true)
  const [signUpState, setSignUpState] = useState(false)
  const [findIdState, setFindIdState] = useState(false)
  const [findPwState, setFindPwState] = useState(false)
  
  return <>
  {loginState ? <Login setLoginState={setLoginState} setSignUpState={setSignUpState} setFindIdState={setFindIdState} setFindPwState={setFindPwState}/> : null}
  {signUpState ? <SignUp setLoginState={setLoginState} setSignUpState={setSignUpState}/> : null}
  {findIdState ? <FindId setLoginState={setLoginState} setFindIdState={setFindIdState}/> : null}
  {findPwState ? <FindPw setLoginState={setLoginState} setFindPwState={setFindPwState}/> : null}
  </>
};
