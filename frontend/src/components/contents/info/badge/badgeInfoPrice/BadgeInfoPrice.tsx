import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  BadgeInfoPriceDiv,
  CollectionDiv,
  CollectionInfoDetailDiv,
  CollectionInfoDiv,
  EditionImg,
  LikeDiv,
  ListPriceDiv,
} from "./BadgeInfoPrice.styled";

interface IBadgeInfoPrice extends ThemeType {
  price: number;
  tokenId: number;
  nftSeq: number;
}

export const BadgeInfoPrice = ({
  isDark,
  price,
  tokenId,
  nftSeq,
}: IBadgeInfoPrice) => {
  let navigate = useNavigate();

  // 정현 추가
  const [editionImage, setEditionImage] = useState("");
  const [nftNum, setNftNum] = useState(0);
  const [nftVolume, setNftVolume] = useState(0);
  const getNftInfo = async () => {
    const nftinfo = await axios({
      method: "get",
      url: "http://j6a105.p.ssafy.io:8080/api/user/info",
      params: {
        nftSeq: nftSeq,
      },
    })
      .then((res) => {
        setEditionImage(res.data.success.editioninfo.edition_image);
        setNftNum(res.data.success.nftinfo.nft_num);
        setNftVolume(res.data.success.nftinfo.nft_volume);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <BadgeInfoPriceDiv isDark={isDark}>
      <ListPriceDiv>
        <LetterBox size="h3" weight="extraBold">
          Listed Price
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          {price} ETH
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
          <LetterBox>{nftNum}st of</LetterBox>
          <EditionImg src={editionImage} />
          <CollectionInfoDetailDiv>
            <LetterBox>Jone Mayer</LetterBox>
            <LetterBox>Gold Edition</LetterBox>
          </CollectionInfoDetailDiv>
        </CollectionInfoDiv>
      </CollectionDiv>
      <LikeDiv>
        <LetterBox size="h3" weight="extraBold">
          Volume
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          😮 {nftVolume}
        </LetterBox>
      </LikeDiv>
    </BadgeInfoPriceDiv>
  );
};
