import axios from "axios";
import { useEffect, useState } from "react";
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
  tokenInfo: any;
}

export const BadgeInfoPrice = ({
  isDark,
  price,
  tokenId,
  nftSeq,
  tokenInfo
}: IBadgeInfoPrice) => {
  let navigate = useNavigate();

  // 정현 추가
  const [editionImage, setEditionImage] = useState("");
  const [nftNum, setNftNum] = useState(0);
  const [nftVolume, setNftVolume] = useState(0);
  const [editionUserName, setEditionUserName] = useState("");
  const [heart, setHeart] = useState(0);
  const [editionNum, setEditionNum] = useState(0);
  const [nftPrice, setNftPrice] = useState(0);

  // const getNftInfo = async () => {
  //   const nftinfo = await axios({
  //     method: "get",
  //     url: "http://uts_url:8080/api/user/info",
  //     params: {
  //       userSeq: tokenInfo.editioninfo[0].user_user_seq,
  //     },
  //   })
  //     .then((res) => {
  //       setEditionImage(res.data.success.editioninfo[0].Edition_edition_image);
  //       setNftNum(res.data.success.nftinfo.nft_num);
  //       setNftVolume(res.data.success.nftinfo.nft_volume);
  //       setEditionUserName(res.data.success.editioninfo[0].user_user_nickname)
  //       setHeart(res.data.success.hearts.heart)
  //       setEditionNum(res.data.success.editioninfo[0].Edition_edition_seq)
  //       setNftPrice(res.data.success.salePrice.sale_price)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://uts_url:8080/api/nft/info?nftSeq=${nftSeq}`
    }).then((res) => {
      setEditionImage(res.data.success.editioninfo[0].Edition_edition_image);
      setNftNum(res.data.success.nftinfo.nft_num);
      setNftVolume(res.data.success.nftinfo.nft_volume);
      setEditionUserName(res.data.success.editioninfo[0].user_user_nickname)
      setHeart(res.data.success.hearts.heart)
      setEditionNum(res.data.success.editioninfo[0].Edition_edition_seq)
      setNftPrice(res.data.success.salePrice.sale_price)
    })
  }

  useEffect(() => {
    getNftInfo()
  },[])
  
  return (
    <BadgeInfoPriceDiv isDark={isDark}>
      <ListPriceDiv>
        <LetterBox size="h3" weight="extraBold">
          Listed Price
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          {nftPrice} ETH
        </LetterBox>
      </ListPriceDiv>
      <CollectionDiv>
        <LetterBox size="h3" weight="extraBold">
          Edition
        </LetterBox>
        <CollectionInfoDiv
          onClick={() => {
            navigate(`/edition/${editionNum}`); // 고쳐야 합니다
          }}
        >
          <LetterBox>{nftNum}st of</LetterBox>
          <EditionImg width="100px" height="100px" src={editionImage} />
          <CollectionInfoDetailDiv>
            <LetterBox>{editionUserName}</LetterBox>
            {/* <LetterBox>Gold Edition</LetterBox> */}
          </CollectionInfoDetailDiv>
        </CollectionInfoDiv>
      </CollectionDiv>
      <LikeDiv>
        <LetterBox size="h3" weight="extraBold">
          Likes
        </LetterBox>
        <LetterBox size="h2" weight="extraBold">
          💖 {heart}
        </LetterBox>
      </LikeDiv>
    </BadgeInfoPriceDiv>
  );
};
