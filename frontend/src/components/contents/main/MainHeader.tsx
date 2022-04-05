import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../recoil/theme";
import LetterBox from "../../containers/letterBox/LetterBox";
import { ImageLayOut, LayOut } from "../market/marketHeader/Market.styled";
import { Image } from "../../containers/Image";
import styled from "styled-components";

const LetterBoxDiv = styled.div`
  margin-top: 100px;
`;

export const MainHeader = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  return (
    <LayOut isDark={isDark}>
      <ImageLayOut
        // initial={{ y: -10 }}
        // animate={{ y: 8 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.4 }}
      >
        <Image height="300px" src="img/MainImg.png" />
      </ImageLayOut>
      <LetterBoxDiv>
        <LetterBox size="h2" weight="bold" color="light">
          당신의
          <LetterBox weight="extraBold" size="h2" color="light">
            {" "}
            아티스트와{" "}
          </LetterBox>{" "}
          더욱 가까워지세요
        </LetterBox>
      </LetterBoxDiv>
    </LayOut>
  );
};
