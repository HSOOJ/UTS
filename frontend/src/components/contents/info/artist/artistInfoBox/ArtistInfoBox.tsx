import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  InfoDetailBox,
  InfoMainbox,
  InfoMoreDetailBox,
} from "./ArtistInfoBox.styled";

interface IArtistInfoBox extends ThemeType {}

export const ArtistInfoBox = ({ isDark }: IArtistInfoBox) => {
  const artistDetailStateVal = useRecoilValue(artistDetailState);

  return (
    <InfoMainbox isDark={isDark}>
      <LetterBox>{artistDetailStateVal.description}</LetterBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>{artistDetailStateVal.category}</InfoMoreDetailBox>
        <InfoMoreDetailBox>{artistDetailStateVal.artistSns}</InfoMoreDetailBox>
        <InfoMoreDetailBox>
          {artistDetailStateVal.artistFollowersTotal}
        </InfoMoreDetailBox>
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
