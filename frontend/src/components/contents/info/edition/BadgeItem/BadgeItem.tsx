import styled from "styled-components";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { message, Progress } from "antd";
import Button from "../../../../containers/button";
import Badge from "../../../../containers/badge";
import { ThemeType } from "../../../../../global/theme";
import Palette from "../../../../../foundation/color/Palette";
import axios from "axios";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { useRecoilState } from "recoil";

const BadgeImg = styled.img`
  border-radius: 50%;
`;

const OwnerImg = styled.img`
  border-radius: 50%;
  margin-top: 10px;
`;

const BadgeInfo = styled.div`
  padding: 15px;
  display: flex;
  gap: 30px;
`;

const BadgeInfoLeft = styled.div`
  width: 70px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const BadgeInfoRight = styled.div`
  /* float: right; */
  /* background-color: green; */
  width: 70px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const BadgeDiv = styled.div<ThemeType>`
  background-color: ${({ isDark }) =>
    isDark ? Palette.Nero100 : Palette.BluOpacity100};
  border-radius: 10px;
  /* border: 1px solid; */
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 230px;
`;

const BadgeSizeControl = styled.div`
  width: 160px;
`;

const BadgeLikeButton = styled.div`
  width: 35px;
  float: right;
`;

const BadgeButtonDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

interface IBadgeItem extends ThemeType {
  isLike: boolean;
}

export const BadgeItem = ({ isDark, isLike }: IBadgeItem) => {
  const [likeBadge, setLikeBadge] = useRecoilState(badgeDetailState);
  const onClickLike = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/like",
      data: {
        userSeq: "11", // 고쳐야 합니다.
        nftSeq: "5",
      },
    }).then(function (res) {
      setLikeBadge({ ...likeBadge, isLike: true });
      message.success("좋아요 되었습니다.");
    });
  };

  const onClickDislike = () => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/unlike",
      data: {
        userSeq: "11", // 고쳐야 합니다.
        nftSeq: "5",
      },
    }).then(function (res) {
      setLikeBadge({ ...likeBadge, isLike: false });
      message.error("좋아요가 취소되었습니다.");
    });
  };
  return (
    <BadgeDiv isDark={isDark}>
      <div>
        <BadgeImg src="https://picsum.photos/150/150" />
      </div>
      <BadgeInfo>
        <BadgeInfoLeft>
          <LetterBox size="h2" weight="extraBold">
            #1
          </LetterBox>
          <br></br>
          <LetterBox color="shade">Price</LetterBox>
          <LetterBox size="h3" weight="extraBold">
            1000SSF
          </LetterBox>
        </BadgeInfoLeft>
        <BadgeInfoRight>
          <LetterBox color="shade">Owner</LetterBox>
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
            {isLike === true ? (
              <div onClick={onClickDislike}>
                <Badge type="like" liked={true}></Badge>
              </div>
            ) : (
              <div onClick={onClickLike}>
                <Badge type="like"></Badge>
              </div>
            )}
          </BadgeLikeButton>
        </BadgeButtonDiv>
      </div>
    </BadgeDiv>
  );
};
