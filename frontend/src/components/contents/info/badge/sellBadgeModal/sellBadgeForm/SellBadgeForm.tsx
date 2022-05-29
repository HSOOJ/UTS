import { message } from "antd";
import { UseFormHandleSubmit } from "react-hook-form";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../../global/theme";
import { badgeDetailState } from "../../../../../../recoil/BadgeDetail";
import Button from "../../../../../containers/button";
import LetterBox from "../../../../../containers/letterBox/LetterBox";
import { Price } from "../input/Price";
import {
  BadgeImg,
  LetterBoxRight,
  SellBadgeModalHeader,
  UnderLine,
  SellBadgeFormDiv,
} from "../SellBadgeModal.styled";
import { ISellBadge } from "../SellBadgeModal.types";
import { resellBadge } from "../../../../../../hooks/minting";
import axios from "axios";
import { useEffect, useState } from "react";
import { FixedNumber } from "ethers";

interface ISellBadgeForm extends ThemeType {
  handleSubmit: UseFormHandleSubmit<ISellBadge>;
  mybadgeid: number
}

export const SellBadgeForm = ({ isDark, handleSubmit, mybadgeid }: ISellBadgeForm) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  const [nftPrice, setNftPrice] = useState(0)
  const [nftId, setNftId] = useState(0)

  const onSubmit = async (res: any) => {
    // tmp
    console.log(res.salePrice);
    console.log("transmitting to blockchain network...");
    // blockChain api 들어가야 함
    console.log("here1")
    console.log("mybadgeid", mybadgeid)
    console.log("saleprice", typeof res.salePrice)
    await resellBadge(Number(mybadgeid), Number(res.salePrice))
    console.log("here2")                                
    message.success("해당 뱃지가 판매 상태로 변경되었습니다.");
    await axios({
      method: "post",
      url: 'http://j6a105.p.ssafy.io:8080/api/nft',
      params: {
        userSeq: localStorage.getItem("userSeq"),
        nftSeq: nftId
      }
    }).then((res) => {
      console.log(res)
      alert("판매 등록이 완료되었습니다! 🥰")
    }).catch((err) => {
      console.log(err)
    })
    
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: false,
    });
  };

  const getNftInfo = async () => {
     console.log("badgeId", mybadgeid)
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${mybadgeid}`
    }).then((res) => {
      // setNftPrice(res.data.success.salePrice.sale_price)
      setNftId(res.data.success.nftinfo.nft_id)
      console.log("nftid", res.data.success.nftinfo.nft_id)
    })
  }
  
  const onClickCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: false,
    });
  };

  useEffect(() => {
    getNftInfo()
  }, [])

  useEffect(() => {
    getNftInfo()
  }, [badgeDetailStateVal.badgeId])

  return (
    <SellBadgeFormDiv isDark={isDark}>
      <SellBadgeModalHeader>
        <LetterBox size="h1" weight="extraBold">
          Sell Badge
        </LetterBox>
        <BadgeImg src="https://picsum.photos/120/120"></BadgeImg>
      </SellBadgeModalHeader>
      <LetterBox size="h3" weight="extraBold" color="shade">
        Price
      </LetterBox>
      <Price isDark={isDark} setNftPrice={setNftPrice}></Price>
      <UnderLine isDark={isDark}></UnderLine>
      <LetterBoxRight>
        <LetterBox size="body2">
          서비스 수수료 3.0%<br></br>거래가 성사되면 10SSF가 지불됩니다.
        </LetterBox>
      </LetterBoxRight>
      <Button styleVariant="primary" onClick={handleSubmit(onSubmit)}>
        Sell
      </Button>
      <Button styleVariant="secondary" onClick={onClickCancel}>
        Cancel
      </Button>
    </SellBadgeFormDiv>
  );
};
