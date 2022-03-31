import { message } from "antd";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  ButtonBox,
  ModalDiv,
  TextBox,
  UnderLine,
} from "./WalletAddressModal.styled";

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
