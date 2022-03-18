import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/user";

export const ProfileCompo = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const token = localStorage.getItem("token");

  // router navigate
  let navigate = useNavigate();
  const moveUserUrl = () => {
    if (!userStateVal.login) navigate("/user");
  };
  useEffect(moveUserUrl, [userStateVal.login]);

  // click button
  const clickDelete = () => {
    console.log(`SUCCESS Delete Account\n${token}`);
    localStorage.clear();
    setUserStateVal({ ...userStateVal, login: false });
  };
  const clickLogout = () => {
    console.log(`LOGOUT & Clear localStorage\n${token}`);
    localStorage.clear();
    setUserStateVal({ ...userStateVal, login: false });
  };

  return (
    <>
      <h1>ProfileCompo</h1>
      <h2>now LoggedIn</h2>
      <button onClick={clickDelete}>Delete Account</button>
      <button onClick={clickLogout}>Logout</button>
      <button>닉네임 수정</button>
      <button>프로필 사진 수정</button>
    </>
  );
};
