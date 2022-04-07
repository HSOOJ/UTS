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
  width: 500px;
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
  const [tokenInfo, setTokenInfo] = useState({});
  const [tokenId, setTokenId] = useState(0);

  const getInfo = async () => {
    // 블록체인과 연결
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(signer.getAddress());
    
    // tokenURI 받아오기
    const tokenURI = await marketContract.tokenURI(tokenId);
    setMyTokenURI(tokenURI.slice(28));
  };

  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${badge_id}`
    }).then((res) => {
      setTokenInfo(res.data.success)
      setTokenId(res.data.success.nftinfo.nft_id)
      setEditName(res.data.success.editioninfo[0].Edition_edition_name)
      setMyTokenDescpt(res.data.success.editioninfo[0].Edition_edition_description)
    })
  }

  const getTokenURI = async () => {
    await axios({
      method: "post",
      url: `https://ipfs.infura.io:5001/api/v0/block/get?arg=${myTokenURI}`,
    })
      .then((res) => {
        const tokenInfo = JSON.parse(res.data.slice(8, -3));
        // setEditName(JSON.parse(res.data.slice(8, -3)).editionName);
        setEditName(tokenInfo.editionName);
        setMyTokenDescpt(tokenInfo.editionDescription);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTokenPrice = async () => {
    const price = await marketContract.getBadgePrice(tokenId);
    setMyTokenPrice(parseInt(price._hex));
  };

  useEffect(() => {
    getInfo();
    getNftInfo();
    // 블록체인에서 읽어오는 방법
    // getTokenURI();
    // getTokenPrice();
  }, []);

  useEffect(() => {
    getNftInfo();
    // getTokenURI();
    // getTokenPrice();
  }, [myTokenURI, tokenId]);
  // 정현 여기까지

  return (
    <Layout>
      <BadgeHeader badge_id={badge_id} tokenInfo={tokenInfo}></BadgeHeader>
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
        tokenInfo={tokenInfo}
      ></BadgeInfoPerson>
      <BadgeInfoPrice
        isDark={isDark}
        price={myTokenPrice}
        tokenId={tokenId}
        nftSeq={Number(badge_id)}
        tokenInfo={tokenInfo}
      ></BadgeInfoPrice>
      <BadgeDetail isDark={isDark} badge_id={Number(badge_id)}></BadgeDetail>
    </Layout>
  );
};
