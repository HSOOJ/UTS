import axios from "axios";
import { useEffect } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { badgeDetailState } from "../../../../recoil/BadgeDetail";
import { profileState } from "../../../../recoil/profile";
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
  margin-top: 50px;
`;

export const BadgeInfo = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  const profileStateVal = useRecoilValue(profileState);

  // 현재 edition_id 잡아내기
  const { badge_id } = useParams() as BadgeParamTypes;

  return (
    <Layout>
      <BadgeHeader badge_id={badge_id}></BadgeHeader>
      <LetterBox weight="extraBold" size="h1">
        Kelly's Badge
      </LetterBox>
      <BadgeInfoPerson isDark={isDark} badge_id={badge_id}></BadgeInfoPerson>
      <BadgeInfoPrice isDark={isDark}></BadgeInfoPrice>
      <BadgeDetail isDark={isDark}></BadgeDetail>
    </Layout>
  );
};
