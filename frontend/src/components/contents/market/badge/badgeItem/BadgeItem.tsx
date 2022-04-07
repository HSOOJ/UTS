import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../../recoil/theme";
import Card from "../../../../containers/card";
import { LayOut } from "./BadgeItem.styled";
import { IBadgeItem } from "./BadgeItem.types";
import { Bottom } from "./Bottom";
import { Content } from "./Content";
import { Header } from "./Header";

export const BadgeItem = (api: IBadgeItem) => {
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <Card isDark={isDark}>
      <LayOut>
        <Header artistSrc={api.nftAuthorImage} badgeImgSrc={api.editionImage} />
        <Content
          owner={{ ownerId: api.nftOwnerSeq, profileSrc: api.nftOwnerImage }}
          isDark={isDark}
          edition={{ number: api.nftNum, totalNumber: api.total }}
          price={api.nftPrice}
          name={api.editionName}
        />
        <Bottom
          isDark={isDark}
          price={api.nftPrice}
          liked={api.liked}
          badgeId={api.nftSeq}
        />
      </LayOut>
    </Card>
    // <Card isDark={isDark}>
    //   <Link to={api.id}>
    //     <LayOut>
    //       <Header artistSrc={api.artistSrc} badgeImgSrc={api.badgeImgSrc} />
    //       <Content
    //         owner={api.owner}
    //         isDark={isDark}
    //         edition={api.edition}
    //         price={api.price}
    //         name={api.name}
    //       />
    //       <Bottom isDark={isDark} price={api.price} liked={api.liked} />
    //     </LayOut>
    //   </Link>
    // </Card>
  );
};
