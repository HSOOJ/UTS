import LetterBox from "../../../containers/letterBox/LetterBox";
import { LayOut } from "./Market.styled";
const BadgeMarketHeader = () => {
  return (
    <LayOut>
      <LetterBox size="h1" weight="bold">
        당신만의 숨은
      </LetterBox>
      <LetterBox size="h1" weight="extraBold" color="primary">
        보석을
      </LetterBox>
      <LetterBox size="h1" weight="bold">
        찾으세요
      </LetterBox>
    </LayOut>
  );
};

export default BadgeMarketHeader;
