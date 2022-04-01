import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { LayOut } from "./Market.styled";

const ArtistMarketHeader = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <LayOut isDark={isDark}>
      <LetterBox size="h2" weight="bold" color="light">
        좀 더 가까이서 만나는, 오직
      </LetterBox>
      <LetterBox size="h2" weight="extraBold" color="primary">
        당신만의
      </LetterBox>
      <LetterBox size="h2" weight="bold" color="light">
        아티스트
      </LetterBox>
    </LayOut>
  );
};

export default ArtistMarketHeader;
