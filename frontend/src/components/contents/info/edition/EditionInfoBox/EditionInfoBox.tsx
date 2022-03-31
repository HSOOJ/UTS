import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { editionDetailState } from "../../../../../recoil/EditionDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  EditionDetail,
  EditionImg,
  EditionInfoBoxDiv,
  EditionTitle,
} from "./EditionInfoBox.styled";

interface EditionInfoBox extends ThemeType {}

export const EditionInfoBox = ({ isDark }: EditionInfoBox) => {
  const editionDetailStateVal = useRecoilValue(editionDetailState);

  return (
    <EditionInfoBoxDiv isDark={isDark}>
      <EditionImg src="https://picsum.photos/150/150" />
      <EditionDetail>
        <EditionTitle>
          <LetterBox size="h1">{editionDetailStateVal.edition_name}</LetterBox>
        </EditionTitle>
        <LetterBox>{editionDetailStateVal.edition_description}</LetterBox>
      </EditionDetail>
    </EditionInfoBoxDiv>
  );
};
