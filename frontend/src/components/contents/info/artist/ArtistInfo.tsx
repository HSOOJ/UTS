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

interface ArtistParamTypes extends Params {
  artist_id: string;
}

export const ArtistInfo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const profileStateVal = useRecoilValue(profileState);

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
        setDescription(res.data.success.artist_artist_description);
        setCategory(res.data.success.artist_code_seq);
        setArtistSns(res.data.success.artist_artist_sns);
        setArtistFollowersTotal(res.data.success.artist_artist_followers_total);
        setUserNickname(res.data.success.user_user_nickname);
        setWalletAddress(res.data.success.user_user_wallet_address);
        setArtistUserId(res.data.success.artist_user_seq);
        setArtistDetailStateVal({
          ...artistDetailStateVal,
          description: res.data.success.artist_artist_description,
          category: res.data.success.artist_code_seq,
          artistSns: res.data.success.artist_artist_sns,
          artistFollowersTotal: res.data.success.artist_artist_followers_total,
          userNickname: res.data.success.user_user_nickname,
          walletAddress: res.data.success.user_user_wallet_address,
          artistId: res.data.success.artist_artist_seq,
          userId: res.data.success.artist_user_seq,
        });
        checkFollow(res.data.success.artist_user_seq, profileStateVal.userSeq);
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
        setArtistEditionList(res.data.success);
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
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [artistSns, setArtistSns] = useState("");
  const [artistFollowersTotal, setArtistFollowersTotal] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [artistEditionList, setArtistEditionList] = useState([]);
  const [artistUserId, setArtistUserId] = useState("");
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);

  const showModal = () => {
    setArtistDetailStateVal({
      ...artistDetailStateVal,
      isOpenWalletAddressModal: true,
    });
  };

  // axios
  const checkFollow = (userTo: string, userFrom: string | null | undefined) => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        // userTo: artistUserId,
        // userFrom: profileStateVal.userSeq,
        userTo,
        userFrom,
      },
    })
      .then(function (res) {
        console.log(res);
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // useEffect
  // useEffect(checkFollow, []);

  // useEffect
  // 고쳐야 합니다
  useEffect(() => {
    getArtistInfo();
    getArtistEdition();
    setFollowArtist({ ...followArtist, artistId: artist_id });
  }, []);

  return (
    <div>
      <ArtistInfomation>
        <ArtistHeader
          artistUserId={artistUserId}
          // isFollow={isFollow}
          artist_id={artist_id}
        />
        {/* <p>{artist_id}번째 아티스트</p> */}
        <LetterBox size="h1" weight="extraBold">
          {userNickname}
        </LetterBox>
        <ButtonSize>
          <Button styleVariant="primary" onClick={showModal}>
            지갑 주소 확인하기
          </Button>
        </ButtonSize>
        <WalletAddressModal
          walletAddress={walletAddress}
          isDark={isDark}
          userNickname={userNickname}
        ></WalletAddressModal>
        <br />
        <ArtistInfoBox
          isDark={isDark}
          description={description}
          category={category}
          artistSns={artistSns}
          artistFollowersTotal={artistFollowersTotal}
        />
        <br />
        <LetterBox size="h2" weight="extraBold">
          BADGE EDITION
        </LetterBox>
        <div>
          {artistEditionList.map((i) => (
            <EditionItem isDark={isDark} editionItem={i}></EditionItem>
          ))}
        </div>
      </ArtistInfomation>
    </div>
  );
};
