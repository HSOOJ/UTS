import { useRecoilValue } from "recoil";
import { BadgeList } from "../../../components/contents/market/badge";
import { Controller } from "../../../components/contents/market/controller";
import { Menu } from "../../../components/contents/market/controller/Controller.types";
import { BadgeMarketHeader } from "../../../components/contents/market/marketHeader";
import { themeAtom } from "../../../recoil/theme";
import {
  ArtistPageLayOut as BadgePageLayOut,
  MarketPlaceLayOut,
} from "../artist/Artist";

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

const SortByList = ["Price High", "Price Low", "Like", "New"];

const artistMenuList: Menu[] = [
  { title: "Category", menuItems: CategoryList },
  { title: "Sort By", menuItems: SortByList },
];

export const Badge = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  return (
    <BadgePageLayOut>
      <BadgeMarketHeader />
      <MarketPlaceLayOut>
        <Controller
          header="Explore Badges"
          isDark={isDark}
          menuList={artistMenuList}
        />
        <BadgeList />
      </MarketPlaceLayOut>
    </BadgePageLayOut>
  );
};
