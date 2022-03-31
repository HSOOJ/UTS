import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../../../../containers/button";
import { WalletAddressModal } from "../walletAddressModal/WalletAddressModal";
import { useRecoilState } from "recoil";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import {
  BadgeCenter,
  BadgeImg,
  BadgeInfoPersonDiv,
  BadgeLeft,
  BadgeRight,
} from "./BadgeInfoPerson.styled";

interface IBadgeInfoPerson extends ThemeType {
  badge_id: string;
}

export const BadgeInfoPerson = ({ isDark, badge_id }: IBadgeInfoPerson) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  let navigate = useNavigate();

  const showModal = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: true,
    });
  };

  const handleCopyPaste = () => {
    copyCodeToClipboard();
    message.success("지갑 주소가 복사되었습니다.");
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  const copyCodeToClipboard = () => {
    const el = "안녕";
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
    });
  };

  const handleCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  return (
    <BadgeInfoPersonDiv isDark={isDark}>
      <div>
        <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold" color="shade">
              Creator
            </LetterBox>
            <BadgeImg
              src="https://picsum.photos/80/80"
              onClick={() => {
                navigate(`/artist/1`); // 고쳐야 합니다
              }}
            />
          </BadgeLeft>
          <BadgeRight>
            <div
              onClick={() => {
                navigate(`/artist/1`); // 고쳐야 합니다
              }}
            >
              <LetterBox size="h3" weight="extraBold">
                현정이
              </LetterBox>
            </div>
            <Button styleVariant="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <WalletAddressModal isDark={isDark}></WalletAddressModal>
          </BadgeRight>
        </BadgeCenter>
      </div>
      <div>
        <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold" color="shade">
              Owner
            </LetterBox>
            <BadgeImg
              onClick={() => {
                navigate(`/artist/1`); // 고쳐야 합니다
              }}
              src="https://picsum.photos/80/80"
            />
          </BadgeLeft>
          <BadgeRight>
            <div
              onClick={() => {
                navigate(`/artist/1`); // 고쳐야 합니다
              }}
            >
              <LetterBox size="h3" weight="extraBold">
                현정이
              </LetterBox>
            </div>
            <Button styleVariant="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <WalletAddressModal isDark={isDark}></WalletAddressModal>
          </BadgeRight>
        </BadgeCenter>
      </div>
    </BadgeInfoPersonDiv>
  );
};
