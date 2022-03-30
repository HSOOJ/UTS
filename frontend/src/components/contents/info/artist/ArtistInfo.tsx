import LetterBox from "../../../containers/letterBox/LetterBox";
import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { ArtistHeader } from "../infoHeader/artistHeader/ArtistHeader";
import { ArtistInfoBox } from "./artistInfoBox/ArtistInfoBox";
import { EditionItem } from "./EditionItem/EditionItem";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistDetailState } from "../../../../recoil/artistDetail";
import { themeAtom } from "../../../../recoil/theme";
import Button from "../../../containers/button";
import { WalletAddressModal } from "./walletAddressModal/WalletAddressModal";

interface ArtistParamTypes extends Params {
  artist_id: string;
}

const ArtistInfomation = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ButtonSize = styled.div`
  width: 200px;
`;

export const ArtistInfo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  const checkFollow = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        userTo: 1,
        userFrom: 1,
      },
    })
      .then(function (res) {
        console.log(res);
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
        console.log(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 현재 artist_id 잡아내기
  const { artist_id } = useParams() as ArtistParamTypes;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);

  // useEffect
  // 고쳐야 합니다
  useEffect(() => {
    checkFollow();
    setwalletAddress("0x23D5ecFf8a5b9f9f5f57EAFE35268bC566BDda55");
    // console.log(followArtist.followArtist);
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
          Kelly Jung
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
