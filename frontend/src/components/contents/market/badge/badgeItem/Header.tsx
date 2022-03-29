import { BadgeImage } from "./BadgeImage";
import { HeaderLayOut } from "./BadgeItem.styled";
import { ProfileImage } from "./ProfileImage";

interface IHeader {
  artistSrc: string;
  badgeImgSrc: string;
}

export const Header = ({ artistSrc, badgeImgSrc }: IHeader) => {
  return (
    <HeaderLayOut>
      <BadgeImage src={badgeImgSrc} />
      <ProfileImage src={artistSrc} />
    </HeaderLayOut>
  );
};
