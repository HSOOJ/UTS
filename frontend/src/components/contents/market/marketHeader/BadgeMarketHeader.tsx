import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import { Image } from "../../../containers/Image";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ImageLayOut, LayOut } from "./Market.styled";
const BadgeMarketHeader = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  return (
    <LayOut isDark={isDark}>
      <ImageLayOut
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.4 }}
      >
        <Image height="100%" src="assets/image/badge/badge.png" />
      </ImageLayOut>
      <LetterBox size="h2" weight="bold" color="light">
        오직
        <LetterBox weight="extraBold" size="h2" color="light">
          {" "}
          당신만의{" "}
        </LetterBox>{" "}
        숨은 보석들
      </LetterBox>
    </LayOut>
  );
};

export default BadgeMarketHeader;
