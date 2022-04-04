import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  InfoDetailBox,
  InfoMainbox,
  InfoMoreDetailBox,
  InfoMoreDetailBoxa,
} from "./ArtistInfoBox.styled";

interface IArtistInfoBox extends ThemeType {
  description: string;
  category: string;
  artistSns: string;
  artistFollowersTotal: string;
}

export const ArtistInfoBox = ({
  isDark,
  description,
  category,
  artistSns,
  artistFollowersTotal,
}: IArtistInfoBox) => {
  const artistDetailStateVal = useRecoilValue(artistDetailState);
  const CategoryList = [
    "",
    "🎵 Music",
    "🎨 Art",
    "⚽ Sport",
    "🎞️ Actors",
    "👜 Fashion",
    "🎙️ Creator",
    "🎸 Other",
  ];

  return (
    <InfoMainbox isDark={isDark}>
      <LetterBox>{description}</LetterBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>{CategoryList[Number(category)]}</InfoMoreDetailBox>
        <InfoMoreDetailBoxa href={`https://${artistSns}`} target="_blank">
          {artistSns}
        </InfoMoreDetailBoxa>
        <InfoMoreDetailBox>{artistFollowersTotal}명의 팔로워</InfoMoreDetailBox>
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
