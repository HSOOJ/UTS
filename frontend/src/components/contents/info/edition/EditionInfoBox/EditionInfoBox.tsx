import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const EditionInfoBoxDiv = styled.div<ThemeType>`
  display: flex;
  /* align-items: center; */
  /* flex-wrap: wrap; */
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  gap: 5px;
  padding-left: 30px;
  border-radius: 10px;
  padding: 30px;
`;

const EditionImg = styled.img`
  border-radius: 50%;
  float: left;
  left: 0%;
`;

const EditionDetail = styled.div`
  margin-left: 20px;
  width: 500px;
`;

const EditionTitle = styled.div`
  margin-bottom: 10px;
  /* text-align: center; */
`;
interface EditionInfoBox extends ThemeType {}

export const EditionInfoBox = ({ isDark }: EditionInfoBox) => {
  return (
    <EditionInfoBoxDiv isDark={isDark}>
      <EditionImg src="https://picsum.photos/150/150" />
      <EditionDetail>
        <EditionTitle>
          <LetterBox size="h1">존 메이어 골드 에디션</LetterBox>
        </EditionTitle>
        <LetterBox>에디션 혜택 설명</LetterBox>
      </EditionDetail>
    </EditionInfoBoxDiv>
  );
};
