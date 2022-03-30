import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Progress } from "antd";
import { ThemeType } from "../../../../../global/theme";
import Palette from "../../../../../foundation/color/Palette";
import { useNavigate } from "react-router-dom";

const EditionItemDiv = styled.div<ThemeType>`
  padding: 20px;
  width: 700px;
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  border-radius: 10px;
  margin-bottom: 15px;
  &:hover {
    transform: scale(1.01);
  }
`;

const EditionItemImg = styled.img`
  border-radius: 50%;
  float: left;
  margin-right: 30px;
`;

const EditionItemDetail = styled.div`
  /* float: right; */
`;

const EditionItemMoreDetail = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

interface IEditionItem extends ThemeType {}

export const EditionItem = ({ isDark }: IEditionItem) => {
  let navigate = useNavigate();

  return (
    <EditionItemDiv
      isDark={isDark}
      onClick={() => {
        navigate(`/edition/1`); // 고쳐야 합니다
      }}
    >
      <EditionItemImg src="https://picsum.photos/50/50" />
      <EditionItemDetail>
        <LetterBox size="h3" weight="extraBold">
          에디션 이름
        </LetterBox>
        <EditionItemMoreDetail>
          <span style={{ width: 300, fontSize: 15 }}>From 2ETH ~</span>
          <span style={{ width: 300, fontSize: 15 }}>2022.03.09</span>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={80}
            showInfo={false}
          />
          <LetterBox>79%</LetterBox>
        </EditionItemMoreDetail>
      </EditionItemDetail>
    </EditionItemDiv>
  );
};
