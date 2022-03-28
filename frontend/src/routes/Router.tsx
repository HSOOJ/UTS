import { Badge } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/contents/about";
import Admin from "../pages/contents/admin";
import Artist from "../pages/contents/artist";
import ArtistDetail from "../pages/contents/artistDetail";
import BadgeDetail from "../pages/contents/badgeDetail";
import Edition from "../pages/contents/edition";
import Main from "../pages/contents/main";
import Minting from "../pages/contents/minting";
import Profile from "../pages/contents/profile";
import User from "../pages/contents/user";
import Footer from "../pages/footer";
import Header from "../pages/header";

export const UtsRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist/:artist_id" element={<ArtistDetail />} />
        <Route path="/badge" element={<Badge />} />
        <Route path="/badge/:badge_id" element={<BadgeDetail />} />
        <Route path="/edition/:edition_id" element={<Edition />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile/:walletAddress" element={<Profile />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
