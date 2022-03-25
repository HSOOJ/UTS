import styled from "styled-components";
import { Controller } from "../../../components/contents/market/controller";
import { ArtistMarketHeader } from "../../../components/contents/market/marketHeader";
// import { ArtistList } from "../../../components/contents/market/artist";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../recoil/theme";
import { Menu } from "../../../components/contents/market/controller/Controller.types";

const CategoryList = [
  "All",
  "🎨 Art",
  "🎵 Music",
  "⚽ Sport",
  "👜 Fashion",
  "🎙️ Creator",
  "🎞️ Actors",
  "🎸 Other",
];

const SortByList = ["TransActions", "Volumes", "New", "Hot"];

const artistMenuList: Menu[] = [
  { title: "Category", menuItems: CategoryList },
  { title: "Sort By", menuItems: SortByList },
];

export const Artist = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  return (
    <ArtistPageLayOut>
      <ArtistMarketHeader />
      <MarketPlaceLayOut>
        <Controller
          header="Explore"
          isDark={isDark}
          menuList={artistMenuList}
        />
        {/* <ArtistList /> */}
      </MarketPlaceLayOut>
    </ArtistPageLayOut>
  );
};

const ArtistPageLayOut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarketPlaceLayOut = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 12px;
  max-width: ${280 + 15 * 4 + 350 * 4}px;
  min-width: 350px;
  gap: 15px;
`;
