import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const InfoMainbox = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

const InfoDetailBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoMoreDetailBox = styled.div`
  text-align: center;
  width: 200px;
`;

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
