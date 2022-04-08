import { useRecoilValue } from "recoil";
import Palette from "../../../../foundation/color/Palette";
import Ethereum from "../../../../foundation/Icon/assets/Ethereum";
import { themeAtom } from "../../../../recoil/theme";
import { shortenString } from "../../../../utils/string";
import LetterBox from "../../../containers/letterBox/LetterBox";
import {
  LayOut,
  Message,
  Modal,
  ModalVariation,
  SVGBox,
  WalletBadge,
} from "./Signature.styled";

export const Signature = (isSuccess: boolean) => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const wallet = localStorage.getItem("userAccount")?.replaceAll('"', "");
  return (
    <LayOut>
      <Modal
        isDark={isDark}
        variants={ModalVariation}
        transition={{ delay: 10, duration: 10 }}
      >
        <SVGBox
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
        >
          <Ethereum />
        </SVGBox>
        <Message>
          <WalletBadge isDark={isDark}>
            <LetterBox size="body1" weight="bold" color="primary">
              {shortenString(wallet!, 18)}
            </LetterBox>
          </WalletBadge>
          <LetterBox size="h3" weight="bold">
            아티스트님의 소중한 뱃지를
          </LetterBox>
          <LetterBox size="h3" weight="bold">
            블록체인 네트워크에 기록중입니다
          </LetterBox>
        </Message>
      </Modal>
    </LayOut>
  );
};
