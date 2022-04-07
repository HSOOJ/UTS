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
    <Link to={api.artist_artist_seq}>
      <Card isDark={isDark}>
        <LayOut>
          <Header
            backgroundSrc={api.user_user_profile_image}
            profileSrc={api.user_user_profile_image}
            isDark={isDark}
          />
          <Profile
            name={api.user_user_nickname}
            followers={api.artist_artist_followers_total}
          />
          <Sales
            Txs={api.artist_txs}
            Volume={api.user_user_volume}
            Highest={api.artist_max}
            isDark={isDark}
          />
          <Token
            // newestDrops={api.newestDrops}
            newestDrops={{
              tokenSrc: api.newest_edition_image,
              tokenName: api.newest_edition_name,
              price: api.latest_volume,
            }}
            bestSellers={{
              tokenSrc: api.bestSeller_edition_image,
              tokenName: api.bestSeller_edition_name,
              price: api.volume,
            }}
            isDark={isDark}
          />
        </LayOut>
      </Card>
    </Link>
    // <Link to={api.id}>
    //   <Card isDark={isDark}>
    //     <LayOut>
    //       <Header
    //         backgroundSrc={api.backgroundSrc}
    //         profileSrc={api.profileSrc}
    //         isDark={isDark}
    //       />
    //       <Profile name={api.name} followers={api.followers} />
    //       <Sales
    //         Txs={api.transActions}
    //         Volume={api.volume}
    //         Highest={api.highest}
    //         isDark={isDark}
    //       />
    //       <Token
    //         newestDrops={api.newestDrops}
    //         bestSellers={api.bestSellers}
    //         isDark={isDark}
    //       />
    //     </LayOut>
    //   </Card>
    // </Link>
  );
};
