import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { editionDetailState } from "../../../../../recoil/EditionDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  EditionContent,
  EditionDetail,
  EditionImg,
  EditionInfoBoxDiv,
  EditionTitle,
} from "./EditionInfoBox.styled";

interface EditionInfoBox extends ThemeType {
  editionName: string;
  editionDescription: string;
  editionImage: string;
}

export const EditionInfoBox = ({
  isDark,
  editionName,
  editionDescription,
  editionImage,
}: EditionInfoBox) => {
  return (
    <EditionInfoBoxDiv isDark={isDark}>
      <EditionImg src={editionImage} />
      <EditionDetail>
        <EditionTitle>
          <LetterBox size="h2" weight="bold">
            {editionName}
          </LetterBox>
        </EditionTitle>
        <div>
          <EditionContent>
            <LetterBox>{editionDescription}</LetterBox>
          </EditionContent>
        </div>
      </EditionDetail>
    </EditionInfoBoxDiv>
  );
};
