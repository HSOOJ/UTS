import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { BadgeItem } from "./BadgeItem/BadgeItem";
import { EditionInfoBox } from "./EditionInfoBox/EditionInfoBox";

interface EditionParamTypes extends Params {
  edition_id: string;
}

const EditionInfomation = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BadgesOnMarket = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const BadgesOnMarketText = styled.div`
  margin-bottom: 20px;
  margin-top: 15px;
`;

export const EditionInfo = () => {
  // 현재 edition_id 잡아내기
  const { edition_id } = useParams() as EditionParamTypes;

  return (
    <EditionInfomation>
      {/* <p>{edition_id}번째 에디션</p> */}
      <ArtistHeader></ArtistHeader>
      <EditionInfoBox></EditionInfoBox>
      <BadgesOnMarketText>
        <LetterBox size="h1">Badges on Market</LetterBox>
      </BadgesOnMarketText>
      <BadgesOnMarket>
        <BadgeItem></BadgeItem>
        <BadgeItem></BadgeItem>
        <BadgeItem></BadgeItem>
      </BadgesOnMarket>
      <BadgesOnMarket>
        <BadgeItem></BadgeItem>
        <BadgeItem></BadgeItem>
        <BadgeItem></BadgeItem>
      </BadgesOnMarket>
    </EditionInfomation>
  );
};
