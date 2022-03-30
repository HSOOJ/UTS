import { message } from "antd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
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
  width: 500px;
  gap: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 0 9999px;
  z-index: 100;
`;

const UnderLine = styled.div<ThemeType>`
  border-bottom: 1px solid;
  border-image: ${({ isDark }) =>
    isDark
      ? "linear-gradient(to right, yellow 0%, #35d835 50%, #3060ff 100%);"
      : "linear-gradient(to right, red 0%, #c4c422 50%, #002cbd 100%);"};
  border-image-slice: 1;
  margin-bottom: 10px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
interface IWalletAddressModal extends ThemeType {}

export const WalletAddressModal = ({ isDark }: IWalletAddressModal) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);

  const copyCodeToClipboard = () => {
    const el = "주소주소주~~"; //고쳐야 합니다
    console.log(navigator.clipboard);
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
      message.success("해당 아티스트의 지갑 주소가 복사되었습니다.");
    });
  };

  const onClickCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  return (
    <div>
      {badgeDetailStateVal.isOpenWalletAddressModal === true ? (
        <ModalDiv isDark={isDark}>
          <TextBox>
            <LetterBox size="h1" weight="extraBold">
              Kelly Jung님의 지갑 주소
            </LetterBox>
            <LetterBox size="h3">
              0x23D5ecFf8a5b9f9f5f57EAFE35268bC566BDda55
            </LetterBox>
          </TextBox>
          <UnderLine isDark={isDark}></UnderLine>
          <ButtonBox>
            <Button styleVariant="primary" onClick={copyCodeToClipboard}>
              지갑 주소 복사하기
            </Button>
            <Button styleVariant="secondary" onClick={onClickCancel}>
              끄기
            </Button>
          </ButtonBox>
        </ModalDiv>
      ) : (
        <></>
      )}
    </div>
  );
};
