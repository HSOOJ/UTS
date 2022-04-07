import { useNavigate } from "react-router-dom";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  BadgeInfoPriceDiv,
  CollectionDiv,
  CollectionInfoDetailDiv,
  CollectionInfoDiv,
  EditionImg,
  LikeDiv,
  ListPriceDiv,
} from "./BadgeInfoPrice.styled";

interface IBadgeInfoPrice extends ThemeType {
  price: number;
}

export const BadgeInfoPrice = ({ isDark, price }: IBadgeInfoPrice) => {
  let navigate = useNavigate();
  return (
    <BadgeInfoPriceDiv isDark={isDark}>
      <ListPriceDiv>
        <LetterBox size="h3" weight="extraBold">
          Listed Price
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          {price} ETH
        </LetterBox>
      </ListPriceDiv>
      <CollectionDiv>
        <LetterBox size="h3" weight="extraBold">
          Edition
        </LetterBox>
        <CollectionInfoDiv
          onClick={() => {
            navigate(`/edition/1`); // 고쳐야 합니다
          }}
        >
          <LetterBox>21st of</LetterBox>
          <EditionImg src="https://picsum.photos/80/80" />
          <CollectionInfoDetailDiv>
            <LetterBox>Jone Mayer</LetterBox>
            <LetterBox>Gold Edition</LetterBox>
          </CollectionInfoDetailDiv>
        </CollectionInfoDiv>
      </CollectionDiv>
      <LikeDiv>
        <LetterBox size="h3" weight="extraBold">
          Likes
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          ❤ 1,220
        </LetterBox>
      </LikeDiv>
    </BadgeInfoPriceDiv>
  );
};
