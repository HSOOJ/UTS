import axios from "axios";
import { useEffect } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { badgeDetailState } from "../../../../recoil/BadgeDetail";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { BadgeHeader } from "../infoHeader/badgeHeader/BadgeHeader";
import { BadgeDetail } from "./badgeDetail/BadgeDetail";
import { BadgeInfoPerson } from "./badgeInfoPerson/BadgeInfoPerson";
import { BadgeInfoPrice } from "./badgeInfoPrice/BadgeInfoPrice";

interface BadgeParamTypes extends Params {
  badge_id: string;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const BadgeInfo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  const checkLike = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/check/heart", // 고쳐야 합니다
      params: {
        userSeq: 11,
        nftSeq: 5,
      },
    })
      .then(function (res) {
        setIsLike({ ...badgeDetailState, isLike: res.data.success });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    checkLike();
  }, []);

  // 현재 edition_id 잡아내기
  const { badge_id } = useParams() as BadgeParamTypes;
  const [isLike, setIsLike] = useRecoilState(badgeDetailState);

  return (
    <Layout>
      <BadgeHeader isLike={isLike.isLike}></BadgeHeader>
      <LetterBox weight="extraBold" size="h1">
        Kelly's Badge
      </LetterBox>
      <BadgeInfoPerson isDark={isDark} badge_id={badge_id}></BadgeInfoPerson>
      <BadgeInfoPrice isDark={isDark}></BadgeInfoPrice>
      <BadgeDetail isDark={isDark}></BadgeDetail>
    </Layout>
  );
};
