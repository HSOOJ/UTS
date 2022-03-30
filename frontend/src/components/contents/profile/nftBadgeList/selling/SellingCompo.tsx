import {
  Container,
  ContainerText,
  Image,
  TextArtistName,
  TextEditionName,
  TextNftNum,
} from "../NftBadgeList.style";

export const SellingCompo = () => {
  return (
    <>
      <Container>
        <Image src="https://media4.giphy.com/media/ho0xXatV7b3Fo1ZRXN/giphy.gif" />
        <ContainerText>
          <TextEditionName>Edition Name: ....</TextEditionName>
          <TextArtistName>Artist Name: ....</TextArtistName>
          <TextNftNum>Nft Number: ....</TextNftNum>
        </ContainerText>
      </Container>
    </>
  );
};
