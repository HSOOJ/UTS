import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  ContainerText,
  Image,
  TextArtistName,
  TextEditionName,
  TextNftNum,
} from "../NftBadgeList.style";

interface PropsType {
  artistNickname: string;
  editionImage: string;
  editionName: string;
  nftNum: string;
  nftSeq: string;
}

export const OwnCompo = ({
  artistNickname,
  editionImage,
  editionName,
  nftNum,
  nftSeq,
}: PropsType) => {
  // useNavigate
  let navigate = useNavigate();

  return (
    <>
      <Container onClick={() => navigate(`/edition/${nftSeq}`)}>
        <Image src={editionImage} />
        <ContainerText>
          <TextEditionName>Edition Name: {editionName}</TextEditionName>
          <TextArtistName>Artist Name: {artistNickname}</TextArtistName>
          <TextNftNum>Nft Number: {nftNum}</TextNftNum>
        </ContainerText>
      </Container>
    </>
  );
};
