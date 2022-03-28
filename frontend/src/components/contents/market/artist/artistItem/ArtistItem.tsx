import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../../recoil/theme";
import Card from "../../../../containers/card";
import { LayOut } from "./ArtistItem.styled";
import { IArtistItem } from "./ArtistItem.types";
import { Header } from "./Header";
import { Profile } from "./Profile";
import { Sales } from "./Sales";
import { Token } from "./Token";

export const ArtistItem = (api: IArtistItem) => {
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <Link to={api.id}>
      <Card isDark={isDark}>
        <LayOut>
          <Header
            backgroundSrc={api.backgroundSrc}
            profileSrc={api.profileSrc}
            isDark={isDark}
          />
          <Profile name={api.name} followers={api.followers} />
          <Sales
            Txs={api.transActions}
            Volume={api.volume}
            Highest={api.highest}
            isDark={isDark}
          />
          <Token
            newestDrops={api.newestDrops}
            bestSellers={api.bestSellers}
            isDark={isDark}
          />
        </LayOut>
      </Card>
    </Link>
  );
};
