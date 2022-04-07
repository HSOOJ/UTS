import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { buyBadge } from "../../../../../hooks/buy";
import { userState } from "../../../../../recoil/user";
import Badge from "../../../../containers/badge";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  BadgeImageLayOut,
  BottomBottomLayOut,
  BottomLayOut,
} from "./BadgeItem.styled";

interface IBottom extends ThemeType {
  badgeId: string;
  price: number;
}

export const Bottom = ({ badgeId, isDark, price }: IBottom) => {
  // recoil
  const { login } = useRecoilValue(userState);

  // useState
  const [like, setLike] = useState(false);

  // Axios
  const [nftSeq, setNftSeq] = useState(0)
  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${badgeId}`
    }).then((res) => {
      setNftSeq(res.data.success.nftinfo.nft_seq)
    })
  }

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

  // useEffect
  useEffect(() => {
    checkLike(localStorage.getItem("userSeq"), badgeId);
  }, [badgeId]);
  useEffect(() => {
    getNftInfo()
  })
  return (
    <BottomLayOut>
      <Link to={badgeId}>
        <Button styleVariant={isDark ? "secondary" : "secondaryWeak"}>
          <LetterBox color="light">자세한 혜택 보러가기</LetterBox>
        </Button>
      </Link>
      <BottomBottomLayOut>
        {/* badgeId자리에는 토큰 아이디, nftSeq자리가 우리가 알고 있는 badgeId 즉 이상하다.*/}
        <Button onClick={() => buyBadge(badgeId, price, nftSeq)} styleVariant="primary">
          <LetterBox weight="extraBold">Buy @ {price} ETH</LetterBox>
        </Button>
        {login ? (
          <BadgeImageLayOut>
            {like ? (
              <div
                onClick={() =>
                  onClickDislike(localStorage.getItem("userSeq"), badgeId)
                }
              >
                <Badge type="like" isDark={isDark} liked={like} />
              </div>
            ) : (
              <div
                onClick={() =>
                  onClickLike(localStorage.getItem("userSeq"), badgeId)
                }
              >
                <Badge type="like" isDark={isDark} liked={like} />
              </div>
            )}
          </BadgeImageLayOut>
        ) : null}
      </BottomBottomLayOut>
    </BottomLayOut>
  );
};
