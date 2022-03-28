import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import { BadgeHeader } from "../infoHeader/badgeHeader/BadgeHeader";

interface BadgeParamTypes extends Params {
  badge_id: string;
}

const BadgeImg = styled.img`
  border-radius: 50%;
`;

export const BadgeInfo = () => {
  // 현재 edition_id 잡아내기
  const { badge_id } = useParams() as BadgeParamTypes;

  return (
    <div>
      <BadgeHeader></BadgeHeader>
      <p>뱃지 이름</p>
      <div>
        <div>
          <p>만든 사람</p>
          <img src="https://picsum.photos/50/50" />
          <p>뱃지 주인</p>
          <img src="https://picsum.photos/50/50" />
        </div>
        <div>
          <p>Listed Price</p>
          <p>Highest Bid</p>
          <p>Collection</p>
        </div>
        <div>
          <p>history</p>
          <p>역사 1</p>
          <p>역사 2</p>
          <p>역사 3</p>
        </div>
        <button>Buy 1000 SSF</button>
        <button>Place a bid</button>
      </div>
    </div>
  );
};
