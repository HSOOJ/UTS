import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import {
  Container,
  ContainerText,
  Image,
  TextArtistName,
  TextEditionName,
  TextNftNum,
} from "./NftBadgeList.style";

interface PropsType {
  artistNickname: string;
  editionImage: string;
  editionName: string;
  nftNum: string;
  nftSeq: string;
  likes?: string;
}

export const NftBadgeListCompo = ({
  artistNickname,
  editionImage,
  editionName,
  nftNum,
  nftSeq,
  likes,
}: PropsType) => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;

  // useNavigate
  let navigate = useNavigate();

  return (
    <>
      <Container onClick={() => navigate(`/edition/${nftSeq}`)}>
        <Image src={editionImage} />
        <ContainerText>
          <TextEditionName isDark={isDark}>
            Edition Name: {editionName}
          </TextEditionName>
          <TextArtistName isDark={isDark}>
            Artist Name: {artistNickname}
          </TextArtistName>
          <TextNftNum isDark={isDark}>Nft Number: {nftNum}</TextNftNum>
          {likes ? (
            <TextNftNum isDark={isDark}>Likes: {likes}</TextNftNum>
          ) : null}
        </ContainerText>
      </Container>
    </>
  );
};
