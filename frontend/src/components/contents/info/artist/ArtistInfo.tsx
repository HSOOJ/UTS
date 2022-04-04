import LetterBox from "../../../containers/letterBox/LetterBox";
import { useParams, Params } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { ArtistInfoBox } from "./artistInfoBox/ArtistInfoBox";
import { EditionItem } from "./editionItem/EditionItem";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { themeAtom } from "../../../../recoil/theme";
import Button from "../../../containers/button";
import { WalletAddressModal } from "./walletAddressModal/WalletAddressModal";
import { ArtistInfomation, ButtonSize } from "./ArtistInfo.styled";

interface ArtistParamTypes extends Params {
  artist_id: string;
}

export const ArtistInfo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  const checkFollow = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        userTo: 2,
        userFrom: 6,
      },
    })
      .then(function (res) {
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getArtistInfo = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/info", // 고쳐야 합니다
      params: {
        artistSeq: artist_id,
      },
    })
      .then(function (res) {
        console.log(res);
        setArtistDetailStateVal({
          ...artistDetailStateVal,
          description: res.data.success.artist_artist_description,
          category: res.data.success.artist_code_seq,
          artistSns: res.data.success.artist_artist_sns,
          artistFollowersTotal: res.data.success.artist_artist_followers_total,
          userNickname: res.data.success.user_user_nickname,
          walletAddress: res.data.success.user_user_wallet_address,
        });
        console.log(artistDetailStateVal.artistFollowersTotal);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getArtistEdition = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/editions", // 고쳐야 합니다
      params: {
        artistSeq: artist_id,
      },
    })
      .then(function (res) {
        console.log(res);
        setArtistDetailStateVal({
          ...artistDetailStateVal,
          artistEditionList: res.data.success,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 현재 artist_id 잡아내기
  const { artist_id } = useParams() as ArtistParamTypes;
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);

  // useEffect
  // 고쳐야 합니다
  useEffect(() => {
    getArtistInfo();
    getArtistEdition();
    checkFollow();
  }, []);

  const showModal = () => {
    setArtistDetailStateVal({
      ...artistDetailStateVal,
      isOpenWalletAddressModal: true,
    });
  };

  return (
    <div>
      <ArtistInfomation>
        <ArtistHeader isFollow={followArtist.followArtist} />
        {/* <p>{artist_id}번째 아티스트</p> */}
        <LetterBox size="h1" weight="extraBold">
          {artistDetailStateVal.userNickname}
        </LetterBox>
        <ButtonSize>
          <Button styleVariant="primary" onClick={showModal}>
            지갑 주소 확인하기
          </Button>
        </ButtonSize>
        <WalletAddressModal isDark={isDark}></WalletAddressModal>
        <br />
        <ArtistInfoBox isDark={isDark} />
        <br />
        <LetterBox size="h2" weight="extraBold">
          BADGE EDITION
        </LetterBox>
        <div>
          <EditionItem isDark={isDark} />
          <EditionItem isDark={isDark} />
          <EditionItem isDark={isDark} />
        </div>
      </ArtistInfomation>
    </div>
  );
};
