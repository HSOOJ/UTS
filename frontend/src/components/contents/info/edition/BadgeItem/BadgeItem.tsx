import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Progress } from "antd";
import Button from "../../../../containers/button";
import Badge from "../../../../containers/badge";

const BadgeImg = styled.img`
  border-radius: 50%;
`;

const OwnerImg = styled.img`
  border-radius: 50%;
`;

const BadgeInfo = styled.div`
  padding: 30px;
  display: flex;
  gap: 30px;
`;

const BadgeInfoLeft = styled.div`
  /* float: left; */
  /* background-color: white; */
  width: 70px;
`;

const BadgeInfoRight = styled.div`
  /* float: right; */
  /* background-color: green; */
  width: 70px;
`;

const BadgeDiv = styled.div`
  background-color: gray;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 230px;
`;

const BadgeSizeControl = styled.div`
  width: 90%;
`;

const BadgeLikeButton = styled.div`
  width: 25%;
  float: right;
`;

const BadgeButtonDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const BadgeItem = () => {
  return (
    <BadgeDiv>
      <div>
        <BadgeImg src="https://picsum.photos/150/150" />
      </div>
      <BadgeInfo>
        <BadgeInfoLeft>
          <LetterBox size="h3">#1</LetterBox>
          <p>Price</p>
          <p>1000SSF</p>
        </BadgeInfoLeft>
        <BadgeInfoRight>
          <p>owner</p>
          <OwnerImg src="https://picsum.photos/50/50" />
        </BadgeInfoRight>
      </BadgeInfo>
      <div>
        {/* if문 걸어서 뱃지 주인이 아닐 때 */}
        <BadgeButtonDiv>
          <BadgeSizeControl>
            <Button styleVariant="primary">Buy</Button>
          </BadgeSizeControl>
          <BadgeLikeButton>
            <Badge type="like"></Badge>
          </BadgeLikeButton>
        </BadgeButtonDiv>
        <button>Buy</button>
        <button>☆</button>
        {/* if문 걸어서 뱃지 주인일 때 */}
        <button>Put on sale</button>
        <button>share</button>
      </div>
    </BadgeDiv>
  );
};
