import { message } from "antd";
import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const BadgeDetailDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  border-radius: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;

interface IBadgeDetail extends ThemeType {}

export const BadgeDetail = ({ isDark }: IBadgeDetail) => {
  const copyCodeToClipboard = () => {
    const el = "주소주소주~~"; //고쳐야 합니다
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
      message.success("해당 뱃지의 url이 클립보드에 저장되었습니다.");
    });
  };

  return (
    <BadgeDetailDiv isDark={isDark}>
      <div>
        <LetterBox size="h1" weight="extraBold">
          history
        </LetterBox>
        <LetterBox>역사 1</LetterBox>
        <LetterBox>역사 2</LetterBox>
        <LetterBox>역사 3</LetterBox>
      </div>
      <ButtonDiv>
        <Button styleVariant="primary">Buy 1000 SSF</Button>
        <Button styleVariant="primary" onClick={copyCodeToClipboard}>
          Share with Friends
        </Button>
      </ButtonDiv>
    </BadgeDetailDiv>
  );
};
