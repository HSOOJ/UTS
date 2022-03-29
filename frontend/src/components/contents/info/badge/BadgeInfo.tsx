import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { BadgeHeader } from "../infoHeader/badgeHeader/BadgeHeader";
import { BadgeDetail } from "./badgeDetail/BadgeDetail";

interface BadgeParamTypes extends Params {
  badge_id: string;
}

const BadgeImg = styled.img`
  border-radius: 50%;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BadgeInfoPerson = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const BadgeInfo = () => {
  // 현재 edition_id 잡아내기
  const { badge_id } = useParams() as BadgeParamTypes;

  return (
    <Layout>
      <BadgeHeader></BadgeHeader>
      <LetterBox weight="bold" size="h1">
        Kelly's Badge
      </LetterBox>
      <BadgeInfoPerson>
        <div>
          <p>만든 사람</p>
          <img src="https://picsum.photos/50/50" />
          <p>현정이</p>
          <p>지갑 정보</p>
        </div>
        <div>
          <p>뱃지 주인</p>
          <img src="https://picsum.photos/50/50" />
          <p>현정이</p>
          <p>지갑 정보</p>
        </div>
      </BadgeInfoPerson>
      <BadgeDetail></BadgeDetail>
    </Layout>
  );
};
