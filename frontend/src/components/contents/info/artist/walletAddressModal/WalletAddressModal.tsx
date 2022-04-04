import { message } from "antd";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  ButtonBox,
  ModalDiv,
  TextBox,
  UnderLine,
} from "./WalletAddressModal.styled";

interface IWalletAddressModal extends ThemeType {
  walletAddress: string;
}

export const WalletAddressModal = ({
  isDark,
  walletAddress,
}: IWalletAddressModal) => {
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);

  const copyCodeToClipboard = () => {
    const el = artistDetailStateVal.walletAddress; //고쳐야 합니다
    console.log(navigator.clipboard);
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
      message.success("해당 아티스트의 지갑 주소가 복사되었습니다.");
    });
  };

  const onClickCancel = () => {
    setArtistDetailStateVal({
      ...artistDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  return (
    <div>
      {artistDetailStateVal.isOpenWalletAddressModal === true ? (
        <ModalDiv isDark={isDark}>
          <TextBox>
            <LetterBox size="h1" weight="extraBold">
              {artistDetailStateVal.userNickname}님의 지갑 주소
            </LetterBox>
            <LetterBox size="h3">{walletAddress}</LetterBox>
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
