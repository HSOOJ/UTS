import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Palette from "../../foundation/color/Palette";
import { ThemeType } from "../../global/theme";
import { themeAtom } from "../../recoil/theme";
import LetterBox from "../containers/letterBox/LetterBox";
import { useNavigate } from "react-router-dom";

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 10px 30px 10px;
  gap: 15px;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  gap: 15px;
`;

const InfoDiv = styled.div``;

const ImgBox = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
`;

const TeamDiv = styled.div`
  position: absolute;
  left: 75%;
`;

const TeamImg = styled.img`
  width: 500px;
`;

export const FooterCompo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  let navigate = useNavigate();
  return (
    <>
      <FooterDiv>
        <ImgDiv>
          <TeamDiv>
            <TeamImg src="img/teamMember.png"></TeamImg>
          </TeamDiv>
          <ImgBox isDark={isDark}>
            <a href="https://www.ssafy.com" target="_blank">
              <Img src="img/ssafyLogo.png"></Img>
            </a>
          </ImgBox>
          <ImgBox isDark={isDark}>
            <a href="https://discord.gg/ZbqzrJDurc" target="_blank">
              <Img src="img/discordLogo.png"></Img>
            </a>
          </ImgBox>
          <ImgBox isDark={isDark}>
            <a
              href="https://www.notion.so/UTS-2ddf37c99896457c813a274658bb892b"
              target="_blank"
            >
              <Img src="img/notionLogo.png"></Img>
            </a>
          </ImgBox>
        </ImgDiv>

        <InfoDiv>
          <a
            href="https://understood-newsboy-a64.notion.site/UTS-1d449d7074bc4b7e80fe680e81f27fce"
            target="_blank"
          >
            <LetterBox>Info |</LetterBox>
          </a>
          <span
            onClick={() => {
              navigate(`/about`);
            }}
          >
            <LetterBox> About | </LetterBox>
          </span>
          <a href="mailto:UnderTheSea105@gmail.com">
            <LetterBox> Contact Us</LetterBox>
          </a>
        </InfoDiv>
        <LetterBox>@ 2022 Under The Sea</LetterBox>
      </FooterDiv>
    </>
  );
};
