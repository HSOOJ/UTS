import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
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

interface IBuyBadgeModal extends ThemeType {}

export const BuyBadgeModal = ({ isDark }: IBuyBadgeModal) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);

  const onClickCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenBuyModal: false,
    });
  };
  return (
    <div>
      {badgeDetailStateVal.isOpenBuyModal === true ? (
        <ModalDiv isDark={isDark}>
          <BuyBadgeModalHeader>
            <LetterBox size="h1" weight="extraBold">
              Buy Badge
            </LetterBox>
            <BadgeImg src="https://picsum.photos/120/120"></BadgeImg>
          </BuyBadgeModalHeader>
          <LetterBox size="h3" weight="extraBold" color="shade">
            Price
          </LetterBox>
          <LetterBox size="h2" weight="extraBold">
            1000 SSF
          </LetterBox>
          <UnderLine isDark={isDark}></UnderLine>
          <LetterBoxRight>
            <LetterBox size="body2">
              서비스 수수료 3.0%<br></br>거래가 성사되면 10SSF가 지불됩니다.
            </LetterBox>
          </LetterBoxRight>
          <Button styleVariant="primary">Buy</Button>
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
