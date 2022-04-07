import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { marketContract } from "../../../../config";
import { badgeDetailState } from "../../../../recoil/BadgeDetail";
import { profileState } from "../../../../recoil/profile";
import { themeAtom } from "../../../../recoil/theme";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { BadgeHeader } from "../infoHeader/badgeHeader/BadgeHeader";
import { BadgeDetail } from "./badgeDetail/BadgeDetail";
import { BadgeInfoPerson } from "./badgeInfoPerson/BadgeInfoPerson";
import { BadgeInfoPrice } from "./badgeInfoPrice/BadgeInfoPrice";
import { ethers } from "ethers";

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

const Boxout = styled.div`
  width: 470px;
  overflow: scroll;
  word-break: break-all;
`;

export const BadgeInfo = () => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  const profileStateVal = useRecoilValue(profileState);

  // 현재 edition_id 잡아내기
  const { badge_id } = useParams() as BadgeParamTypes;

  // 정현 여기서 부터
  // 정현 추가
  const [editionName, setEditName] = useState("");
  const [myTokenURI, setMyTokenURI] = useState("");
  const [myTokenDescpt, setMyTokenDescpt] = useState("");
  const [myTokenCreator, setMyTokenCreator] = useState("");
  const [myTokenPrice, setMyTokenPrice] = useState(0);
  // ❤ tokenId를 선택해서 보도록 여기 수정!
  const tokenId = 3;
  const nftSeq = 1;

  useEffect(() => {
    getInfo();
    getTokenURI();
    getTokenPrice();
  }, []);

  useEffect(() => {
    // getInfo();
    getTokenURI();
    // getTokenPrice();
  }, [myTokenURI]);

  const getInfo = async () => {
    setEditName("");
    setMyTokenURI("");
    setMyTokenDescpt("");
    setMyTokenCreator("");
    // 블록체인과 연결
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(signer.getAddress());

    // tokenURI 받아오기
    const tokenURI = await marketContract.tokenURI(tokenId);
    setMyTokenURI(tokenURI.slice(28));
    console.log("tokenURI", myTokenURI);
  };

  const getTokenURI = async () => {
    await axios({
      method: "post",
      url: `https://ipfs.infura.io:5001/api/v0/block/get?arg=${myTokenURI}`,
    })
      .then((res) => {
        const tokenInfo = JSON.parse(res.data.slice(8, -3));
        setEditName(JSON.parse(res.data.slice(8, -3)).editionName);
        setMyTokenDescpt(tokenInfo.editionDescription);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTokenPrice = async () => {
    setMyTokenPrice(0);
    const price = await marketContract.getBadgePrice(tokenId);
    console.log("price", parseInt(price._hex));
    setMyTokenPrice(parseInt(price._hex));
  };
  // 정현 여기까지

  return (
    <Layout>
      <BadgeHeader badge_id={badge_id}></BadgeHeader>
      <LetterBox weight="extraBold" size="h1">
        {editionName}
      </LetterBox>
      <Boxout>
        <LetterBox size="h2">{myTokenDescpt}</LetterBox>
      </Boxout>
      <BadgeInfoPerson
        isDark={isDark}
        badge_id={badge_id}
        tokenId={tokenId}
        tokenURI={myTokenURI}
      ></BadgeInfoPerson>
      <BadgeInfoPrice
        isDark={isDark}
        price={myTokenPrice}
        tokenId={tokenId}
        nftSeq={nftSeq}
      ></BadgeInfoPrice>
      <BadgeDetail isDark={isDark}></BadgeDetail>
    </Layout>
  );
};
