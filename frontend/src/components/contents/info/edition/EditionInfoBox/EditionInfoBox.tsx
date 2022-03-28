import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const EditionInfoBoxDiv = styled.div`
  display: flex;
  /* align-items: center; */
  /* flex-wrap: wrap; */
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

export const EditionInfoBox = () => {
  return (
    <EditionInfoBoxDiv>
      <EditionImg src="https://picsum.photos/150/150" />
      <EditionDetail>
        <LetterBox size="h1">존 메이어 골드 에디션</LetterBox>
        <p>에디션 혜택 설</p>
      </EditionDetail>
    </EditionInfoBoxDiv>
  );
};
