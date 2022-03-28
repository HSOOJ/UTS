import { ThemeType } from "../../../../../global/theme";
import { Image } from "../../../../containers/Image";
import { IImage } from "../../../../containers/Image/Image.types";
import { borderColor, ProfileImageLayOut } from "./ArtistItem.styled";

export const ProfileImage = ({ src, isDark }: IImage & ThemeType) => {
  return (
    <ProfileImageLayOut>
      <Image
        borderSize={10}
        borderColor={borderColor[isDark ? "dark" : "light"]}
        width="110px"
        height="110px"
        src={src}
        shape="round"
      />
    </ProfileImageLayOut>
  );
};
