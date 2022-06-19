import { Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistState } from "../../../../recoil/artist";
import { editionDetailState } from "../../../../recoil/EditionDetail";
import { profileState } from "../../../../recoil/profile";
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
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const [editionDetailStateVal, setEditionDetailStateVal] =
    useRecoilState(editionDetailState);
  const [artistStateVal, setArtistStateVal] = useRecoilState(artistState);
  const profileStateVal = useRecoilValue(profileState);

  // 현재 edition_id 잡아내기
  const { edition_id } = useParams() as EditionParamTypes;

  // useState
  const [editionName, setEditionName] = useState("");
  const [editionDescription, setEditionDescription] = useState("");
  const [editionImage, setEditionImage] = useState("");

  // Axios
  const getEditionDetail = () => {
    axios({
      method: "GET",
      url: "http://uts_url:8080/api/edition/info",
      params: {
        editionSeq: edition_id,
      },
    })
      .then(function (res) {
        // console.log(res);
        setEditionName(res.data.success.edition_name);
        setEditionDescription(res.data.success.edition_description);
        setEditionImage(res.data.success.edition_image);
        setEditionDetailStateVal({
          ...editionDetailStateVal,
          artist_seq: res.data.success.artist_seq,
          edition_description: res.data.success.edition_description,
          edition_image: res.data.success.edition_image,
          edition_name: res.data.success.edition_name,
          edition_seq: res.data.success.edition_seq,
        });
        setArtistStateVal({
          ...artistStateVal,
          artistUserSeq: res.data.success.artist_user_seq,
          artistSeq: res.data.success.artist_seq,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const getBadgeList = () => {
    axios({
      method: "GET",
      url: "http://uts_url:8080/api/edition/nfts",
      params: {
        editionSeq: edition_id,
        userSeq: profileStateVal.userSeq,
      },
    })
      .then(function (res) {
        // console.log(res);
        setEditionDetailStateVal({
          ...editionDetailStateVal,
          badge_list: res.data.success,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // useEffect
  useEffect(() => {
    getEditionDetail();
    getBadgeList();
  }, []);

  return (
    <EditionInfomation>
      <ArtistHeader editionId={edition_id} />
      <EditionInfoBox
        isDark={isDark}
        editionName={editionName}
        editionDescription={editionDescription}
        editionImage={editionImage}
      ></EditionInfoBox>
      <BadgesOnMarketText>
        <LetterBox size="h1" weight="extraBold">
          Badges on Market
        </LetterBox>
      </BadgesOnMarketText>
      <BadgesOnMarket>
        <Row justify="start">
          {editionDetailStateVal.badge_list.map((i, index) => (
            <BadgeItem key={index} isDark={isDark} badgeItem={i}></BadgeItem>
          ))}
        </Row>
      </BadgesOnMarket>
    </EditionInfomation>
  );
};
