import LetterBox from "../../../../containers/letterBox/LetterBox";
import { message } from "antd";
import Button from "../../../../containers/button";
import Badge from "../../../../containers/badge";
import { ThemeType } from "../../../../../global/theme";
import axios from "axios";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { profileState } from "../../../../../recoil/profile";
import { useEffect, useState } from "react";

interface IBadgeItem extends ThemeType {
  badgeItem: any;
}

export const BadgeItem = ({ isDark, badgeItem }: IBadgeItem) => {
  // recoil
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  const profileStateVal = useRecoilValue(profileState);

  // useState
  const [like, setLike] = useState(false);

  // useNavigate
  let navigate = useNavigate();

  // Axios
  const checkLike = (userSeq: string | null | undefined, nftSeq: string) => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/check/heart", // 고쳐야 합니다
      params: {
        // userSeq: profileStateVal.userSeq,
        // nftSeq: badgeItem.nft_num,
        userSeq,
        nftSeq,
      },
    })
      .then(function (res) {
        // console.log(res)
        setLike(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const onClickLike = (userSeq: string | null | undefined, nftSeq: string) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/like",
      data: {
        // userSeq: profileStateVal.userSeq,
        // nftSeq: badgeItem.nft_seq,
        userSeq,
        nftSeq,
      },
    }).then(function (res) {
      setLike(true);
      message.success("좋아요 되었습니다.");
    });
  };
  const onClickDislike = (
    userSeq: string | null | undefined,
    nftSeq: string
  ) => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/unlike",
      data: {
        // userSeq: profileStateVal.userSeq,
        // nftSeq: badgeItem.nft_seq,
        userSeq,
        nftSeq,
      },
    }).then(function (res) {
      setLike(false);
      message.error("좋아요가 취소되었습니다.");
    });
  };

  // function
  const onClickBuy = () => {
    setBadgeDetailStateVal({ ...badgeDetailStateVal, isOpenBuyModal: true });
  };

  // useEffect
  useEffect(() => {
    checkLike(profileStateVal.userSeq, badgeItem.nft_seq);
  }, [badgeItem]);

  return (
    <div>
      <BadgeDiv isDark={isDark}>
        <div>
          <BadgeImg
            src={badgeItem.edition_image}
            onClick={() => {
              navigate(`/badge/${badgeItem.nft_seq}`);
            }}
          />
        </div>
        <BadgeInfo>
          <BadgeInfoLeft
            onClick={() => {
              navigate(`/badge/${badgeItem.nft_seq}`);
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
              src={badgeItem.nft_owner_image}
              onClick={() => {
                navigate(`/artist/${badgeItem.nft_owner_seq}`);
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
              {profileStateVal.userSeq ? (
                <>
                  {like === true ? (
                    <div
                      onClick={() =>
                        onClickDislike(
                          profileStateVal.userSeq,
                          badgeItem.nft_seq
                        )
                      }
                    >
                      <Badge type="like" liked={true}></Badge>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        onClickLike(profileStateVal.userSeq, badgeItem.nft_seq)
                      }
                    >
                      <Badge type="like"></Badge>
                    </div>
                  )}
                </>
              ) : null}
            </BadgeLikeButton>
          </BadgeButtonDiv>
        </div>
      </BadgeDiv>
      <BuyBadgeModal isDark={isDark}></BuyBadgeModal>
    </div>
  );
};
