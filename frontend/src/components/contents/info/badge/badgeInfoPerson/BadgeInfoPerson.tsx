import styled from "styled-components";
import Palette from "../../../../../foundation/color/Palette";
import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Modal, Button, message } from "antd";
import { useState } from "react";

const BadgeImg = styled.img`
  border-radius: 50%;
`;

const BadgeInfoPersonDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  width: 700px;
  padding: 20px;
  justify-content: center;
  gap: 50px;
`;

const BadgeLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BadgeRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
`;

const BadgeCenter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 250px;
`;

interface IBadgeInfoPerson extends ThemeType {
  badge_id: string;
}

export const BadgeInfoPerson = ({ isDark, badge_id }: IBadgeInfoPerson) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCopyPaste = () => {
    setIsModalVisible(false);
    copyCodeToClipboard();
    message.success("지갑 주소가 복사되었습니다.");
  };

  const copyCodeToClipboard = () => {
    const el = "안녕";
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <BadgeInfoPersonDiv isDark={isDark}>
      <div>
        <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold">
              Creator
            </LetterBox>
            <BadgeImg src="https://picsum.photos/80/80" />
          </BadgeLeft>
          <BadgeRight>
            <LetterBox size="h3" weight="extraBold">
              현정이
            </LetterBox>
            <Button type="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <Modal
              title={`${badge_id}님의 지갑 주소`} // 고쳐야 합니다
              visible={isModalVisible}
              onOk={handleCopyPaste}
              onCancel={handleCancel}
              okText="지갑 주소 복사하기"
              cancelText="닫기"
            >
              <p>안녕!</p>
            </Modal>
          </BadgeRight>
        </BadgeCenter>
      </div>
      <div>
        <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold">
              Owner
            </LetterBox>
            <BadgeImg src="https://picsum.photos/80/80" />
          </BadgeLeft>
          <BadgeRight>
            <LetterBox size="h3" weight="extraBold">
              현정이
            </LetterBox>
            <Button type="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <Modal
              title={`${badge_id}님의 지갑 주소`} // 고쳐야 합니다
              visible={isModalVisible}
              onOk={handleCopyPaste}
              onCancel={handleCancel}
              okText="지갑 주소 복사하기"
              cancelText="닫기"
            >
              <p>안녕!</p>
            </Modal>
          </BadgeRight>
        </BadgeCenter>
      </div>
    </BadgeInfoPersonDiv>
  );
};
