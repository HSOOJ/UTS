import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { LayOut } from "./Market.styled";
const BadgeMarketHeader = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  return (
    <LayOut isDark={isDark}>
      <LetterBox size="h2" weight="bold" color="light">
        당신만의 숨은
      </LetterBox>
      <LetterBox size="h2" weight="extraBold" color="light">
        보석을
      </LetterBox>
      <LetterBox size="h2" weight="bold" color="light">
        찾으세요
      </LetterBox>
    </LayOut>
  );
};

export default BadgeMarketHeader;
