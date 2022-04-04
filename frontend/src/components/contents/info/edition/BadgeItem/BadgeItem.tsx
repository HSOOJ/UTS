import LetterBox from "../../../../containers/letterBox/LetterBox";
import { message } from "antd";
import Button from "../../../../containers/button";
import Badge from "../../../../containers/badge";
import { ThemeType } from "../../../../../global/theme";
import axios from "axios";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { BuyBadgeModal } from "../../badge/buyBadgeModal/BuyBadgeModal";
import {
  BadgeButtonDiv,
  BadgeDiv,
  BadgeImg,
  BadgeInfo,
  BadgeInfoLeft,
  BadgeInfoRight,
  BadgeLikeButton,
  BadgeSizeControl,
  OwnerImg,
} from "./BadgeItem.style";

interface IBadgeItem extends ThemeType {
  isLike: boolean;
  badgeItem: any;
}

export const BadgeItem = ({ isDark, isLike, badgeItem }: IBadgeItem) => {
  let navigate = useNavigate();
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);

  const [likeBadge, setLikeBadge] = useRecoilState(badgeDetailState);
  const onClickLike = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/like",
      data: {
        userSeq: "1", // 고쳐야 합니다.
        nftSeq: "1",
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
        userSeq: "1", // 고쳐야 합니다.
        nftSeq: "1",
      },
    }).then(function (res) {
      setLikeBadge({ ...likeBadge, isLike: false });
      message.error("좋아요가 취소되었습니다.");
    });
  };

  const onClickBuy = () => {
    setBadgeDetailStateVal({ ...badgeDetailStateVal, isOpenBuyModal: true });
  };

  console.log();

  return (
    <div>
      <BadgeDiv isDark={isDark}>
        <div>
          <BadgeImg
            src="https://picsum.photos/150/150"
            onClick={() => {
              navigate(`/badge/${badgeItem.nft_num}`); // 고쳐야 합니다
            }}
          />
        </div>
        <BadgeInfo>
          <BadgeInfoLeft
            onClick={() => {
              navigate(`/badge/1`); // 고쳐야 합니다
            }}
          >
            <LetterBox size="h2" weight="extraBold">
              #{badgeItem.nft_num}
            </LetterBox>
            <br></br>
            <LetterBox color="shade">Price</LetterBox>
            <LetterBox size="h3" weight="extraBold">
              {badgeItem.nft_price}SSF
            </LetterBox>
          </BadgeInfoLeft>
          <BadgeInfoRight>
            <LetterBox color="shade">Owner</LetterBox>
            <OwnerImg
              src="https://picsum.photos/50/50"
              onClick={() => {
                navigate(`/artist/${badgeItem.nft_owner_seq}`); // 고쳐야 합니다
              }}
            />
          </BadgeInfoRight>
        </BadgeInfo>
        <div>
          {/* if문 걸어서 뱃지 주인이 아닐 때 */}
          <BadgeButtonDiv>
            <BadgeSizeControl>
              <Button styleVariant="primary" onClick={onClickBuy}>
                Buy
              </Button>
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
      <BuyBadgeModal isDark={isDark}></BuyBadgeModal>
    </div>
  );
};
