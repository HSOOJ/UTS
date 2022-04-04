import axios from "axios";
import { useEffect } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { badgeDetailState } from "../../../../recoil/BadgeDetail";
import { editionDetailState } from "../../../../recoil/EditionDetail";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { BadgeItem } from "./BadgeItem/BadgeItem";
import {
  BadgesOnMarket,
  BadgesOnMarketText,
  EditionInfomation,
} from "./EditionInfo.styled";
import { EditionInfoBox } from "./EditionInfoBox/EditionInfoBox";

interface EditionParamTypes extends Params {
  edition_id: string;
}

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
        setBadgeDetailStateVal({
          ...badgeDetailStateVal,
          isLike: res.data.success,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getEditionDetail = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/edition/info", // 고쳐야 합니다
      params: {
        editionSeq: edition_id,
      },
    })
      .then(function (res) {
        setEditionDetailStateVal({
          ...editionDetailStateVal,
          artist_seq: res.data.success.artist_seq,
          edition_description: res.data.success.edition_description,
          edition_image: res.data.success.edition_image,
          edition_name: res.data.success.edition_name,
          edition_seq: res.data.success.edition_seq,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getBadgeList = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/edition/nfts", // 고쳐야 합니다
      params: {
        editionSeq: edition_id,
      },
    })
      .then(function (res) {
        console.log(res);
        // setEditionDetailStateVal({
        //   ...editionDetailStateVal,
        //   // badge_list: res.data.
        // });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    checkFollow();
    checkLike();
    getEditionDetail();
    getBadgeList();
  }, []);

  // 현재 edition_id 잡아내기
  const { edition_id } = useParams() as EditionParamTypes;
  const isDark = useRecoilValue(themeAtom).isDark;
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  const [editionDetailStateVal, setEditionDetailStateVal] =
    useRecoilState(editionDetailState);

  return (
    <EditionInfomation>
      {/* <p>{editionDetailStateVal.artist_seq}번째 에디션</p> */}
      <ArtistHeader isFollow={followArtist.followArtist} />
      <EditionInfoBox isDark={isDark}></EditionInfoBox>
      <BadgesOnMarketText>
        <LetterBox size="h1" weight="extraBold">
          Badges on Market
        </LetterBox>
      </BadgesOnMarketText>
      <BadgesOnMarket>
        <BadgeItem
          isDark={isDark}
          isLike={badgeDetailStateVal.isLike}
        ></BadgeItem>
        <BadgeItem
          isDark={isDark}
          isLike={badgeDetailStateVal.isLike}
        ></BadgeItem>
      </BadgesOnMarket>
    </EditionInfomation>
  );
};
