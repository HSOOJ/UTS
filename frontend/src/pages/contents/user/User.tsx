import Login from "../../../components/contents/user/login";
import SignUp from "../../../components/contents/user/signUp";
import FindId from "../../../components/contents/user/findId";
import FindPw from "../../../components/contents/user/findPw";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileState } from "../../../recoil/profile";

export const User = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // router navigate
  let navigate = useNavigate();

  // useEffect
  useEffect(() => {
    setUserStateVal({ ...userStateVal, loginForm: true });
  }, []);
  useEffect(() => {
    if (userStateVal.login) {
      navigate(`/profile/${profileStateVal.userWallet}`);
    }
  }, [userStateVal.login]);

  return (
    <>
      {userStateVal.loginForm ? <Login /> : null}
      {/* {userStateVal.signUp ? <SignUp /> : null}
      {userStateVal.findId ? <FindId /> : null}
      {userStateVal.findPw ? <FindPw /> : null} */}
    </>
  );
};
