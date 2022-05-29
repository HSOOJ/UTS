import { Image } from "../../../../containers/Image";
import { IImage } from "../../../../containers/Image/Image.types";
import { BadgeImageLayOut } from "./BadgeItem.styled";

export const ProfileImage = ({ src }: IImage) => {
  return (
    <BadgeImageLayOut>
      <Image width="65px" height="65px" src={src} shape="round" />
    </BadgeImageLayOut>
  );
};
