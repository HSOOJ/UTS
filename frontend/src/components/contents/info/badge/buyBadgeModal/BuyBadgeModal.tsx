import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";

const ModalDiv = styled.div<ThemeType>`
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ isDark }) => (isDark ? Palette.Nero100 : `#e3ebff`)};
  width: 400px;
  gap: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 0 9999px;
  z-index: 100;
`;

const BadgeImg = styled.img`
  display: flex;
  flex-direction: row;
  border-radius: 50%;
  margin-left: auto;
`;

const BuyBadgeModalHeader = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
`;

const LetterBoxRight = styled.div`
  text-align: end;
  margin-bottom: 5px;
`;

const UnderLine = styled.div<ThemeType>`
  border-bottom: 1px solid;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, yellow 0%, #35d835 50%, #3060ff 100%);"
      : "linear-gradient(to right, red 0%, #c4c422 50%, #002cbd 100%);"};
  border-image-slice: 1;
`;

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
