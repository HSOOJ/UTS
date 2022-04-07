import { Link } from "react-router-dom";
import { ThemeType } from "../../../../../global/theme";
import { buyBadge } from "../../../../../hooks/buy";
import Badge from "../../../../containers/badge";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  BadgeImageLayOut,
  BottomBottomLayOut,
  BottomLayOut,
} from "./BadgeItem.styled";

interface IBottom extends ThemeType {
  badgeId: string;
  liked: boolean;
  price: number;
}

export const Bottom = ({ badgeId, isDark, price, liked }: IBottom) => {
  return (
    <BottomLayOut>
      <Link to={badgeId}>
        <Button styleVariant={isDark ? "secondary" : "secondaryWeak"}>
          <LetterBox color="light">자세한 혜택 보러가기</LetterBox>
        </Button>
      </Link>
      <BottomBottomLayOut>
        <Button onClick={() => buyBadge(badgeId, price)} styleVariant="primary">
          <LetterBox weight="extraBold">Buy @ {price} ETH</LetterBox>
        </Button>
        <BadgeImageLayOut>
          <Badge type="like" isDark={isDark} liked={liked} />
        </BadgeImageLayOut>
      </BottomBottomLayOut>
    </BottomLayOut>
  );
};
