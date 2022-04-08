import { ThemeType } from "../../../../../global/theme";
import { Image } from "../../../../containers/Image";
import { IImage } from "../../../../containers/Image/Image.types";
import { BadgeImageLayOut } from "./BadgeItem.styled";

export const BadgeImage = ({ src, isDark }: IImage & ThemeType) => {
  return (
    <BadgeImageLayOut>
      <Image width="170px" height="170px" shape="round" src={src}></Image>
    </BadgeImageLayOut>
  );
};
