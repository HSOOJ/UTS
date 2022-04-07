import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { buyBadge } from "../../../../../hooks/buy";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  BadgeImg,
  BuyBadgeModalHeader,
  LetterBoxRight,
  ModalDiv,
  UnderLine,
} from "./BuyBadgeModal.styled";

interface IBuyBadgeModal extends ThemeType {

}

export const BuyBadgeModal = ({ isDark }: IBuyBadgeModal) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);

  const onClickCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenBuyModal: false,
    });
  };

  const [nftPrice, setNftPrice] = useState(0);
  const [nftId, setNftId] = useState(0);
  const [nftImage, setNftImage] = useState("")
  const [nftSeq, setNftSeq] = useState(0)
  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${badgeDetailStateVal.badgeId}`
    }).then((res) => {
      setNftPrice(res.data.success.salePrice.sale_price)
      setNftId(res.data.success.nftinfo.nft_id)
      setNftImage(res.data.success.editioninfo[0].Edition_edition_image)
      setNftSeq(res.data.success.nftinfo.nft_seq)
    })
  }

  useEffect(() => {
    getNftInfo()
  }, [])

  useEffect(() => {
    getNftInfo()
  }, [badgeDetailStateVal.badgeId])


  return (
    <div>
      {badgeDetailStateVal.isOpenBuyModal === true ? (
        <ModalDiv isDark={isDark}>
          <BuyBadgeModalHeader>
            <LetterBox size="h1" weight="extraBold">
              Buy Badge
            </LetterBox>
            <BadgeImg width="100px" height="100px" src={nftImage}></BadgeImg>
          </BuyBadgeModalHeader>
          <LetterBox size="h3" weight="extraBold" color="shade">
            Price
          </LetterBox>
          <LetterBox size="h2" weight="extraBold">
            {nftPrice} ETH
          </LetterBox>
          <UnderLine isDark={isDark}></UnderLine>
          <LetterBoxRight>
            <LetterBox size="body2">
              서비스 수수료 2.5%<br></br>거래가 성사되면 {nftPrice} ETH이 지불됩니다.
            </LetterBox>
          </LetterBoxRight>
          <Button
            onClick={() => {
              buyBadge(String(nftId), nftPrice, nftSeq);
            }}
            styleVariant="primary"
          >
            Buy ({nftId})
          </Button>
          <Button styleVariant="secondary" onClick={onClickCancel}>
            Cancel
          </Button>
        </ModalDiv>
      ) : (
        <div></div>
      )}
    </div>
  );
};
