import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const EditionInfoBoxDiv = styled.div`
  display: flex;
  /* align-items: center; */
  /* flex-wrap: wrap; */
  background-color: gray;
  width: 700px;
  gap: 5px;
  padding-left: 30px;
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

export const EditionInfoBox = () => {
  return (
    <EditionInfoBoxDiv>
      <EditionImg src="https://picsum.photos/150/150" />
      <EditionDetail>
        <EditionTitle>
          <LetterBox size="h1">존 메이어 골드 에디션</LetterBox>
        </EditionTitle>
        <p>에디션 혜택 설명</p>
      </EditionDetail>
    </EditionInfoBoxDiv>
  );
};
