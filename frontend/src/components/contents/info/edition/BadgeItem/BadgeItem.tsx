import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Progress } from "antd";

const BadgeImg = styled.img`
  border-radius: 50%;
`;

const OwnerImg = styled.img`
  border-radius: 50%;
`;

const BadgeInfo = styled.div`
  padding: 30px;
`;

const BadgeInfoLeft = styled.div`
  float: left;
`;

const BadgeInfoRight = styled.div`
  float: right;
`;

export const BadgeItem = () => {
  return (
    <div>
      <div>
        <BadgeImg src="https://picsum.photos/100/100" />
      </div>
      <BadgeInfo>
        <BadgeInfoLeft>
          <span>#1</span>
          <span>Price</span>
          <span>1000SSF</span>
        </BadgeInfoLeft>
        <BadgeInfoRight>
          <span>owner 정보</span>
          <OwnerImg src="https://picsum.photos/30/30" />
        </BadgeInfoRight>
      </BadgeInfo>
      <div>
        {/* if문 걸어서 뱃지 주인이 아닐 때 */}
        <button>Buy</button>
        <button>☆</button>
        {/* if문 걸어서 뱃지 주인일 때 */}
        <button>Put on sale</button>
        <button>share</button>
      </div>
    </div>
  );
};
