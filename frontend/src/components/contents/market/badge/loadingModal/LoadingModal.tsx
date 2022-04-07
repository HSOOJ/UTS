import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { Icon } from "../../../../../foundation/Icon/Icon";
import { themeAtom } from "../../../../../recoil/theme";
import { shortenString } from "../../../../../utils/string";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  LayOut,
  Message,
  Modal,
  ModalVariation,
  WalletBadge,
} from "../../../minting/signature/Signature.styled";

export const LoadingModal = () => {
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
          transition={{ repeat: Infinity, duration: 0.8, repeatDelay: 0.2 }}
        >
          <Icon name="circle-notch" color="primary" size={20} />
        </SVGBox>
        <Message>
          <LetterBox size="h3" weight="bold">
            현재 연결된 지갑
          </LetterBox>
          <WalletBadge isDark={isDark}>
            <LetterBox size="body1" weight="bold" color="primary">
              {shortenString(wallet!, 18)}
            </LetterBox>
          </WalletBadge>
          <LetterBox size="body1" weight="bold">
            팬덤을 소유하는 신개념 NFT 마켓플레이스
          </LetterBox>
          <LetterBox size="h3" weight="extraBold" color="primary">
            UTS
          </LetterBox>
        </Message>
      </Modal>
    </LayOut>
  );
};

const SVGBox = styled(motion.div)`
  width: 90px;
  height: 90px;
  svg {
    color: ${Palette.Blu200};
  }
`;
