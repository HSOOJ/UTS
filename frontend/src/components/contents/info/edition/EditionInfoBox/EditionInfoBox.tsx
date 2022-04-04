import { ThemeType } from "../../../../../global/theme";
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
}

export const EditionInfoBox = ({
  isDark,
  editionName,
  editionDescription,
}: EditionInfoBox) => {
  return (
    <EditionInfoBoxDiv isDark={isDark}>
      <EditionImg src="https://picsum.photos/150/150" />
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
