import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isArtist, setIsArtist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Link to={"/"}>로고</Link>
      <NavLink to={"/artist"}>아티스트</NavLink>
      <NavLink to={"/badge"}>뱃지</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      {isArtist ? <NavLink to={"/minting"}>Mint</NavLink> : null}
      {isAdmin ? <NavLink to={"/admin"}>Admin</NavLink> : null}
      {isLoggedIn ? (
        <NavLink to={"/profile"}>Profile</NavLink>
      ) : (
        <NavLink to={"/user"}>Login</NavLink>
      )}
    </>
  );
};
