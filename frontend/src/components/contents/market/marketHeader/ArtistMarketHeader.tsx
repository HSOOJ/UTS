import LetterBox from "../../../containers/letterBox/LetterBox";
import { LayOut } from "./Market.styled";

const ArtistMarketHeader = () => {
  return (
    <LayOut>
      <LetterBox size="h1" weight="bold">
        좀 더 가까이서 만나는, 오직
      </LetterBox>
      <LetterBox size="h1" weight="extraBold" color="primary">
        당신만의
      </LetterBox>
      <LetterBox size="h1" weight="bold">
        아티스트
      </LetterBox>
    </LayOut>
  );
};

export default ArtistMarketHeader;
