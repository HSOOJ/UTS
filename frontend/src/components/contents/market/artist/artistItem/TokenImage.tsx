import { ThemeType } from "../../../../../global/theme";
import { Image } from "../../../../containers/Image";
import { IImage } from "../../../../containers/Image/Image.types";
import { borderColor, TokenImageLayOut } from "./ArtistItem.styled";

export const TokenImage = ({ src, isDark }: IImage & ThemeType) => {
  return (
    <TokenImageLayOut>
      <Image
        borderColor={isDark ? borderColor["dark"] : borderColor["light"]}
        borderSize={6}
        width="65px"
        height="65px"
        shape="round"
        src={src}
      ></Image>
    </TokenImageLayOut>
  );
};
