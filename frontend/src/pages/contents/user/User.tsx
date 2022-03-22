import Login from "../../../components/contents/user/login";
import SignUp from "../../../components/contents/user/signUp";
import FindId from "../../../components/contents/user/findId";
import FindPw from "../../../components/contents/user/findPw";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // router navigate
  let navigate = useNavigate();

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
    if (!userStateVal.login) {
      setUserStateVal({ ...userStateVal, loginForm: true });
    }
  }, [userStateVal.login]);

  return (
    <>
      {userStateVal.loginForm ? <Login /> : null}
      {userStateVal.signUp ? <SignUp /> : null}
      {userStateVal.findId ? <FindId /> : null}
      {userStateVal.findPw ? <FindPw /> : null}
    </>
  );
};
