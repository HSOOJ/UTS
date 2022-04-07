import { ThemeType } from "../../../../../global/theme";
import { Badge } from "../../../../containers/badge/Badge";
import { BadgeLayOut, borderColor } from "./ArtistItem.styled";
import { BackgroundImage } from "./BackgroundImage";
import { ProfileImage } from "./ProfileImage";

interface IHeader extends ThemeType {
  backgroundSrc: string;
  profileSrc: string;
}

export const Header = (api: IHeader) => {
  return (
    <BackgroundImage src={api.backgroundSrc}>
      <ProfileImage src={api.profileSrc} isDark={api.isDark} />
      {/* <BadgeLayOut>
        <Badge
          key={api + ""}
          type="like"
          isDark={api.isDark}
          borderColor={api.isDark ? borderColor["dark"] : borderColor["light"]}
        />
      </BadgeLayOut> */}
    </BackgroundImage>
  );
};
