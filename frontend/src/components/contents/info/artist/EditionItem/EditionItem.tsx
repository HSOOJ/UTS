import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Progress } from "antd";

const EditionItemDiv = styled.div`
  padding: 10px;
`;

const EditionItemImg = styled.img`
  border-radius: 50%;
  float: left;
  margin-right: 15px;
`;

const EditionItemDetail = styled.div`
  /* float: right; */
`;

const EditionItemMoreDetail = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const EditionItem = () => {
  return (
    <EditionItemDiv>
      <EditionItemImg src="https://picsum.photos/50/50" />
      <EditionItemDetail>
        <LetterBox size="h3" weight="bold">
          에디션 이름
        </LetterBox>
        <EditionItemMoreDetail>
          <p style={{ width: 300 }}>From 2ETH ~</p>
          <p style={{ width: 300 }}>2022.03.09</p>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={70}
          />
        </EditionItemMoreDetail>
      </EditionItemDetail>
    </EditionItemDiv>
  );
};
