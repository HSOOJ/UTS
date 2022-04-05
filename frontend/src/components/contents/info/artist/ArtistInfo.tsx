import LetterBox from "../../../containers/letterBox/LetterBox";
import { useParams, Params } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { ArtistInfoBox } from "./artistInfoBox/ArtistInfoBox";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { themeAtom } from "../../../../recoil/theme";
import Button from "../../../containers/button";
import { WalletAddressModal } from "./walletAddressModal/WalletAddressModal";
import { ArtistInfomation, ButtonSize } from "./ArtistInfo.styled";
import { EditionItem } from "./EditionItem/EditionItem";
import { profileState } from "../../../../recoil/profile";
import { artistState } from "../../../../recoil/artist";

interface ArtistParamTypes extends Params {
  artist_id: string;
}

export const ArtistInfo = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);
  const [artistStateVal, setArtistStateVal] = useRecoilState(artistState);
  const { userSeq } = useRecoilValue(profileState);

  // 현재 artist_id 잡아내기
  const { artist_id } = useParams() as ArtistParamTypes;

  // useState
  const [datas, setDatas] = useState({
    desc: "",
    category: "",
    sns: "",
    followers: "",
    nickname: "",
    wallet: "",
  });
  const [dataList, setDataList] = useState([]);

  // Axios
  const getArtistInfo = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/info",
      params: {
        artistSeq: artist_id,
      },
    })
      .then(function (res) {
        // console.log(res);
        setDatas({
          desc: res.data.success.artist_artist_description,
          category: res.data.success.artist_code_seq,
          sns: res.data.success.artist_artist_sns,
          followers: res.data.success.artist_artist_followers_total,
          nickname: res.data.success.user_user_nickname,
          wallet: res.data.success.user_user_wallet_address,
        });
        setArtistStateVal({
          ...artistStateVal,
          artistSeq: artist_id,
          artistUserSeq: res.data.success.artist_user_seq,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const getArtistEdition = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/editions",
      params: {
        artistSeq: artist_id,
      },
    })
      .then(function (res) {
        // console.log(res);
        setDataList(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // function
  const showModal = () => {
    setArtistDetailStateVal({
      ...artistDetailStateVal,
      isOpenWalletAddressModal: true,
    });
  };

  // useEffect
  useEffect(() => {
    getArtistInfo();
    getArtistEdition();
  }, []);

  return (
    <div>
      <ArtistInfomation>
        <ArtistHeader />
        <LetterBox size="h1" weight="extraBold">
          {datas.nickname}
        </LetterBox>
        <ButtonSize>
          <Button styleVariant="primary" onClick={showModal}>
            지갑 주소 확인하기
          </Button>
        </ButtonSize>
        <WalletAddressModal
          walletAddress={datas.wallet}
          isDark={isDark}
          userNickname={datas.nickname}
        ></WalletAddressModal>
        <br />
        <ArtistInfoBox
          isDark={isDark}
          description={datas.desc}
          category={datas.category}
          artistSns={datas.sns}
          artistFollowersTotal={datas.followers}
        />
        <br />
        <LetterBox size="h2" weight="extraBold">
          BADGE EDITION
        </LetterBox>
        <div>
          {dataList.map((i, index) => (
            <EditionItem
              key={index}
              isDark={isDark}
              editionItem={i}
            ></EditionItem>
          ))}
        </div>
      </ArtistInfomation>
    </div>
  );
};
