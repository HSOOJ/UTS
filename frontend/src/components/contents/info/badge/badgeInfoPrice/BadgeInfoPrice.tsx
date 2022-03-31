import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const BadgeInfoPriceDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 20px;
`;

const ListPriceDiv = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const CollectionDiv = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const LikeDiv = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const CollectionInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const CollectionInfoDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditionImg = styled.img`
  border-radius: 50%;
`;

interface IBadgeInfoPrice extends ThemeType {}

export const BadgeInfoPrice = ({ isDark }: IBadgeInfoPrice) => {
  let navigate = useNavigate();
  return (
    <BadgeInfoPriceDiv isDark={isDark}>
      <ListPriceDiv>
        <LetterBox size="h3" weight="extraBold">
          Listed Price
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          1 ETH
        </LetterBox>
      </ListPriceDiv>
      <CollectionDiv>
        <LetterBox size="h3" weight="extraBold">
          Edition
        </LetterBox>
        <CollectionInfoDiv
          onClick={() => {
            navigate(`/edition/1`); // 고쳐야 합니다
          }}
        >
          <LetterBox>21st of</LetterBox>
          <EditionImg src="https://picsum.photos/80/80" />
          <CollectionInfoDetailDiv>
            <LetterBox>Jone Mayer</LetterBox>
            <LetterBox>Gold Edition</LetterBox>
          </CollectionInfoDetailDiv>
        </CollectionInfoDiv>
      </CollectionDiv>
      <LikeDiv>
        <LetterBox size="h3" weight="extraBold">
          Likes
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          ❤ 1,220
        </LetterBox>
      </LikeDiv>
    </BadgeInfoPriceDiv>
  );
};
