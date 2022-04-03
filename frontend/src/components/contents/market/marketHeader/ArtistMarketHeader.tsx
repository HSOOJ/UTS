import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import { Image } from "../../../containers/Image";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ImageLayOut, LayOut } from "./Market.styled";

const ArtistMarketHeader = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <LayOut isDark={isDark}>
      <ImageLayOut
        initial={{ y: -20 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.4 }}
      >
        <Image height="100%" src="assets/image/artist/artist.png" />
      </ImageLayOut>
      <LetterBox size="h2" weight="bold" color="light">
        좀 더 가까이서 만나는, 오직
        <LetterBox weight="extraBold" size="h2" color="light">
          {" "}
          당신만의{" "}
        </LetterBox>{" "}
        아티스트
      </LetterBox>
    </LayOut>
  );
};

export default ArtistMarketHeader;
