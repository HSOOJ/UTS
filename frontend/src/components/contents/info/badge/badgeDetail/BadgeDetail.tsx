import { message } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { profileState } from "../../../../../recoil/profile";
import Button from "../../../../containers/button";
import { BuyBadgeModal } from "../buyBadgeModal/BuyBadgeModal";
import { SellBadgeModal } from "../sellBadgeModal/SellBadgeModal";
import { BadgeDetailDiv, ButtonDiv } from "./BadgeDetail.styled";
import axios from "axios";

interface IBadgeDetail extends ThemeType {
  badge_id: number;
}

export const BadgeDetail = ({ isDark, badge_id }: IBadgeDetail) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  // 정현 추가

  // 여기까지 정현 추가
  const userDetailStateVal = useRecoilValue(profileState);
  const [nftPrice, setNftPrice] = useState(0);
  const copyCodeToClipboard = () => {
    const el = "주소주소주~~"; //고쳐야 합니다
    // console.log(navigator.clipboard);
    navigator.clipboard.writeText(el).then(() => {
      // console.log(`${el} success`);
      message.success("해당 뱃지의 url이 클립보드에 저장되었습니다.");
    });
  };

  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${badge_id}`,
    }).then((res) => {
      setNftPrice(res.data.success.salePrice.sale_price);
    });
  };

  const onClickBuy = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenBuyModal: true,
      badgeId: badge_id,
    });
  };

  const onClickSell = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: true,
    });
  };

  useEffect(() => {
    getNftInfo();
  }, []);
  // console.log(userDetailStateVal.userWallet); // badgeDetailStateVal.userWallet이랑 같으면 어떻게 하고 아니면 어떻게 하게 해결 해야함

  return (
    <BadgeDetailDiv isDark={isDark}>
      <div>
      </div>
      <ButtonDiv>
        <Button styleVariant="primary" onClick={onClickBuy}>
          Buy this Badge ({nftPrice} ETH)
        </Button>
        <Button styleVariant="primary" onClick={copyCodeToClipboard}>
          Share with Friends
        </Button>
      </ButtonDiv>
      <BuyBadgeModal isDark={isDark}></BuyBadgeModal>
      <ButtonDiv>
        <Button styleVariant="primary" onClick={onClickSell}>
          Sell this Badge
        </Button>
        <Button styleVariant="primary" onClick={copyCodeToClipboard}>
          Share with Friends
        </Button>
      </ButtonDiv>
      <SellBadgeModal isDark={isDark} mybadgeid={badge_id}></SellBadgeModal>
    </BadgeDetailDiv>
  );
};
