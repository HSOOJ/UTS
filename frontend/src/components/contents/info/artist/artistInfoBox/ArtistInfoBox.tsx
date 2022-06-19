import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  InfoDetailBox,
  InfoDetailDescript,
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
      <InfoDetailDescript isDark={isDark}>
        <LetterBox>{description}</LetterBox>
      </InfoDetailDescript>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox isDark={isDark}>
          {CategoryList[Number(category)]}
        </InfoMoreDetailBox>

        <InfoMoreDetailBoxa
          isDark={isDark}
          href={`https://${artistSns}`}
          target="_blank"
        >
          {artistSns.length > 20 ? artistSns.slice(0, 20) + "..." : artistSns}
        </InfoMoreDetailBoxa>
        <InfoMoreDetailBox isDark={isDark}>
          {artistFollowersTotal}명의 팔로워
        </InfoMoreDetailBox>
      </InfoDetailBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox isDark={isDark}>총 매출</InfoMoreDetailBox>
        <InfoMoreDetailBox isDark={isDark}>최고가</InfoMoreDetailBox>
        <InfoMoreDetailBox isDark={isDark}>거래량</InfoMoreDetailBox>
      </InfoDetailBox>
    </InfoMainbox>
  );
};
