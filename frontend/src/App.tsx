import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/contents/about";
import Admin from "./pages/contents/admin";
import Artist from "./pages/contents/artist";
import ArtistDetail from "./pages/contents/artistDetail";
import Badge from "./pages/contents/badge";
import BadgeDetail from "./pages/contents/badgeDetail";
import Edition from "./pages/contents/edition";
import Main from "./pages/contents/main";
import Minting from "./pages/contents/minting";
import Profile from "./pages/contents/profile";
import User from "./pages/contents/user";
import Header from "./pages/header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/artist" element={<Artist />}>
            <Route path=":artist-id" element={<ArtistDetail />} />
          </Route>
          <Route path="/badge" element={<Badge />}>
            <Route path=":badge-id" element={<BadgeDetail />} />
          </Route>
          <Route path="/edition/:edition-id" element={<Edition />} />
          <Route path="/user" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
