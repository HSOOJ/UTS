import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user";

export const Navbar = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // state
  const [isArtist, setIsArtist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      setUserStateVal({ ...userStateVal, login: false });
    } else {
      setUserStateVal({ ...userStateVal, login: true });
    }
  }, []);

  return (
    <>
      <Link to={"/"}>로고</Link>
      <NavLink to={"/artist"}>아티스트</NavLink>
      <NavLink to={"/badge"}>뱃지</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      {isArtist ? <NavLink to={"/minting"}>Mint</NavLink> : null}
      {isAdmin ? <NavLink to={"/admin"}>Admin</NavLink> : null}
      {userStateVal.login ? (
        <NavLink to={"/profile"}>Profile</NavLink>
      ) : (
        <NavLink to={"/user"}>Login</NavLink>
      )}
    </>
  );
};
