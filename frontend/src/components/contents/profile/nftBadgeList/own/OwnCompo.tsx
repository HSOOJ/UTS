import styled from "styled-components";
import {
  Container,
  ContainerText,
  Image,
  TextArtistName,
  TextEditionName,
  TextNftNum,
} from "../NftBadgeList.style";

export const OwnCompo = () => {
  return (
    <>
      <Container>
        <Image src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcoacAK%2FbtrtITSdtOg%2FVEhZQHJ0y7eroYe2KNF6q0%2Fimg.jpg" />
        <ContainerText>
          <TextEditionName>Edition Name: ....</TextEditionName>
          <TextArtistName>Artist Name: ....</TextArtistName>
          <TextNftNum>Nft Number: ....</TextNftNum>
        </ContainerText>
      </Container>
    </>
  );
};
