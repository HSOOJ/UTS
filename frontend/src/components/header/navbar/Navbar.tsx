import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownCompo from "./dropdown";
import ThemeToggle from "./themeToggle";

export const Navbar = () => {
  // recoil

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
      <ThemeToggle />
      <DropdownCompo />
    </>
  );
};
