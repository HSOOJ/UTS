import axios from "axios";
import { useEffect } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { badgeDetailState } from "../../../../recoil/BadgeDetail";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { BadgeItem } from "./BadgeItem/BadgeItem";
import { EditionInfoBox } from "./EditionInfoBox/EditionInfoBox";

interface EditionParamTypes extends Params {
  edition_id: string;
}

const EditionInfomation = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BadgesOnMarket = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const BadgesOnMarketText = styled.div`
  margin-bottom: 20px;
  margin-top: 15px;
`;

export const EditionInfo = () => {
  const checkFollow = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        userTo: 2,
        userFrom: 33,
      },
    })
      .then(function (res) {
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
        console.log(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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
    checkFollow();
    checkLike();
  }, []);

  // 현재 edition_id 잡아내기
  const { edition_id } = useParams() as EditionParamTypes;
  const isDark = useRecoilValue(themeAtom).isDark;
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const [isLike, setIsLike] = useRecoilState(badgeDetailState);

  return (
    <EditionInfomation>
      {/* <p>{edition_id}번째 에디션</p> */}
      <ArtistHeader isFollow={followArtist.followArtist} />
      <EditionInfoBox isDark={isDark}></EditionInfoBox>
      <BadgesOnMarketText>
        <LetterBox size="h1" weight="extraBold">
          Badges on Market
        </LetterBox>
      </BadgesOnMarketText>
      <BadgesOnMarket>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
      </BadgesOnMarket>
      <BadgesOnMarket>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
        <BadgeItem isDark={isDark} isLike={isLike.isLike}></BadgeItem>
      </BadgesOnMarket>
    </EditionInfomation>
  );
};
