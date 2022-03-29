import { ThemeType } from "../../../../../global/theme";
import { shortenString } from "../../../../../utils/string";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { ContentLayOut, NameBoxLayOut, OwnerBox } from "./BadgeItem.styled";
import { EditionDataType, OwnerDataType } from "./BadgeItem.types";
import { ProfileImage } from "./ProfileImage";

interface IContent {
  owner: OwnerDataType;
  edition: EditionDataType;
  price: number;
  name: string;
}

export const Content = ({
  owner,
  name,
  edition,
  price,
  isDark,
}: IContent & ThemeType) => {
  return (
    <ContentLayOut>
      <NameBoxLayOut>
        <LetterBox
          size={name.length >= 14 ? "body1" : name.length >= 9 ? "h3" : "h2"}
          color={isDark ? "light" : "dark"}
          weight="extraBold"
        >
          {shortenString(name, 19)}
        </LetterBox>
        <LetterBox color={isDark ? "light" : "dark"} weight="bold">
          # {edition.number} / {edition.totalNumber}
        </LetterBox>
        <LetterBox color="shade" weight="bold">
          Price
        </LetterBox>
        <LetterBox size="h3" color="primary" weight="bold">
          {price} ETH
        </LetterBox>
      </NameBoxLayOut>
      <OwnerBox>
        <LetterBox color={isDark ? "light" : "dark"} size="h3" weight="bold">
          Owner
        </LetterBox>
        <ProfileImage src={owner.profileSrc} />
      </OwnerBox>
    </ContentLayOut>
  );
};
