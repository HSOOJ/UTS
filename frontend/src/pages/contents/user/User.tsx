import Login from "../../../components/contents/user/login";
import SignUp from "../../../components/contents/user/signUp";
import FindId from "../../../components/contents/user/findId";
import FindPw from "../../../components/contents/user/findPw";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  // recoil
  const { login, signUp, findId, findPw } = useRecoilValue(userState);

  // router navigate
  let navigate = useNavigate();
  const moveProfileUrl = () => {
    if (login) navigate("/profile");
  };
  useEffect(moveProfileUrl, [login]);

  return (
    <>
      {login ? null : <Login />}
      {signUp ? <SignUp /> : null}
      {findId ? <FindId /> : null}
      {findPw ? <FindPw /> : null}
    </>
  );
};
