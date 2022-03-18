import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user";

export const Navbar = () => {
  // recoil
  const { login } = useRecoilValue(userState); // userStateVal.login

  // state
  const [isArtist, setIsArtist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Link to={"/"}>로고</Link>
      <NavLink to={"/artist"}>아티스트</NavLink>
      <NavLink to={"/badge"}>뱃지</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      {isArtist ? <NavLink to={"/minting"}>Mint</NavLink> : null}
      {isAdmin ? <NavLink to={"/admin"}>Admin</NavLink> : null}
      {login ? (
        <NavLink to={"/profile"}>Profile</NavLink>
      ) : (
        <NavLink to={"/user"}>Login</NavLink>
      )}
    </>
  );
};
