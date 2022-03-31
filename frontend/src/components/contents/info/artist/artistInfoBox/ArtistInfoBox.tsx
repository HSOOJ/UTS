import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  InfoDetailBox,
  InfoMainbox,
  InfoMoreDetailBox,
} from "./ArtistInfoBox.styled";

interface IArtistInfoBox extends ThemeType {}

export const ArtistInfoBox = ({ isDark }: IArtistInfoBox) => {
  return (
    <InfoMainbox isDark={isDark}>
      <LetterBox>아티스트 여러줄 소개 블라블라</LetterBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>아트</InfoMoreDetailBox>
        <InfoMoreDetailBox>소셜 링크</InfoMoreDetailBox>
        <InfoMoreDetailBox>팔로워 수</InfoMoreDetailBox>
      </InfoDetailBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>총 매출</InfoMoreDetailBox>
        <InfoMoreDetailBox>최고가</InfoMoreDetailBox>
        <InfoMoreDetailBox>거래량</InfoMoreDetailBox>
      </InfoDetailBox>
    </InfoMainbox>
  );
};
