import {
  Container,
  ContainerText,
  Image,
  TextArtistName,
  TextEditionName,
  TextNftNum,
} from "../NftBadgeList.style";

export const LikeCompo = () => {
  return (
    <>
      <Container>
        <Image src="https://cdn.vox-cdn.com/thumbor/SiIyeqmKIJGcOJccz94pHgwmgvQ=/0x0:1400x1400/1200x800/filters:focal(588x588:812x812):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68837730/poptart1redrainbowfix_1.0.gif" />
        <ContainerText>
          <TextEditionName>Edition Name: ....</TextEditionName>
          <TextArtistName>Artist Name: ....</TextArtistName>
          <TextNftNum>Nft Number: ....</TextNftNum>
          <TextNftNum>Likes: ....</TextNftNum>
        </ContainerText>
      </Container>
    </>
  );
};
