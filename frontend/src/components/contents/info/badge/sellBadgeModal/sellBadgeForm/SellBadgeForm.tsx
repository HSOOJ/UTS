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

interface ISellBadgeForm extends ThemeType {
  handleSubmit: UseFormHandleSubmit<ISellBadge>;
}

export const SellBadgeForm = ({ isDark, handleSubmit }: ISellBadgeForm) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);

  const onSubmit = (res: any) => {
    // tmp
    console.log(res.salePrice);
    console.log("transmitting to blockchain network...");
    // blockChain api 들어가야 함
    message.success("해당 뱃지가 판매 상태로 변경되었습니다.");
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: false,
    });
  };

  const onClickCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenSellModal: false,
    });
  };

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
      <Price isDark={isDark}></Price>
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
