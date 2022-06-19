import { ThemeType } from "../../../../../global/theme";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../../../../containers/button";
import { WalletAddressModal } from "../walletAddressModal/WalletAddressModal";
import { useRecoilState } from "recoil";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import {
  BadgeCenter,
  BadgeImg,
  BadgeInfoPersonDiv,
  BadgeLeft,
  BadgeRight,
} from "./BadgeInfoPerson.styled";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { marketContract } from "../../../../../config";
import axios from "axios";

interface IBadgeInfoPerson extends ThemeType {
  badge_id: string;
  tokenId: number;
  tokenURI: string;
  tokenInfo: any;
}

export const BadgeInfoPerson = ({
  isDark,
  badge_id,
  tokenId,
  tokenURI,
  tokenInfo
}: IBadgeInfoPerson) => {
  const [badgeDetailStateVal, setBadgeDetailStateVal] =
    useRecoilState(badgeDetailState);
  let navigate = useNavigate();
  // 정현 추가

  const [myTokenCreator, setMyTokenCreator] = useState("");
  const [myTokenOwner, setMyTokenOwner] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorImage, setCreatorImage] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  

  const getInfo = async () => {
    setMyTokenCreator("");
    setCreatorName("");
    setCreatorImage("");
    // 블록체인과 연결
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(signer.getAddress());
  };
  const getTokenInfo = async () => {
    setMyTokenCreator("");
    const creator = await marketContract.getBadgeSeller(tokenId);
    // const owner = await marketContract.ownerOf(tokenId);
    console.log("creator", creator)
    setMyTokenCreator(creator);
    // setMyTokenOwner(owner);
  };

  const getUserInfo = async () => {
    // creator 주소로 정보 받아오기
    const userinfo = await axios({
      method: "get",
      url: "http://uts_url:8080/api/user/info/address",
      params: {
        userWalletAddress: myTokenCreator,
      },
    })
      .then((res) => {
        setCreatorName(res.data.success.user_nickname);
        setCreatorImage(res.data.success.user_profile_image);
        console.log("userinfo", res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
    // owner주소로 정보 받아오기
  };

  const getUserName = async () => {
    await axios({
      method: "get",
      url: "http://uts_url:8080/api/user/info/address",
      params: {
        userWalletAddress: myTokenOwner,
      },
    })
      .then((res) => {
        setOwnerName(res.data.success.user_nickname);
        setOwnerImage(res.data.success.user_profile_image);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // 백엔드에서 불러오기
  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://uts_url:8080/api/nft/info?nftSeq=${badge_id}`
    }).then((res) => {
      setCreatorImage(res.data.success.editioninfo[0].user_user_profile_image)
      setCreatorName(res.data.success.editioninfo[0].user_user_nickname)
      setMyTokenCreator(res.data.success.editioninfo[0].user_user_wallet_address)
    })
  }

  // 정현 여기까지
  const showModal = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: true,
    });
  };

  const handleCopyPaste = () => {
    copyCodeToClipboard();
    message.success("지갑 주소가 복사되었습니다.");
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  const copyCodeToClipboard = () => {
    const el = "안녕";
    navigator.clipboard.writeText(el).then(() => {
      console.log(`${el} success`);
    });
  };

  const handleCancel = () => {
    setBadgeDetailStateVal({
      ...badgeDetailStateVal,
      isOpenWalletAddressModal: false,
    });
  };

  useEffect(() => {
    getInfo();
    getNftInfo();
    
    // getTokenInfo();
    // getUserInfo();
  }, []);
  // useEffect(() => {
  //   getNftInfo();
  //   getTokenInfo();
  //   getUserInfo();
  //   getUserName();
  // }, [tokenId, tokenURI]);

  return (
    <BadgeInfoPersonDiv isDark={isDark}>
      <div>
        <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold" color="shade">
              Creator
            </LetterBox>
            <BadgeImg width="80px" height="80px"
              src={creatorImage}
              onClick={() => {
                navigate(`/artist/${tokenInfo.editioninfo[0].artist_artist_seq}`); // 고쳐야 합니다
              }}
            />
          </BadgeLeft>
          <BadgeRight>
            <div
              onClick={() => {
                navigate(`/artist/${tokenInfo.editioninfo[0].artist_artist_seq}`); // 고쳐야 합니다
              }}
            >
              <LetterBox size="h3" weight="extraBold">
                {creatorName}
              </LetterBox>
            </div>
            <Button styleVariant="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <WalletAddressModal
              isDark={isDark}
              address={myTokenCreator}
            ></WalletAddressModal>
          </BadgeRight>
        </BadgeCenter>
      </div>
      <div>
        {/* <BadgeCenter>
          <BadgeLeft>
            <LetterBox size="h3" weight="bold" color="shade">
              Owner
            </LetterBox>
            <BadgeImg width="80px"
              onClick={() => {
                navigate(`/profile/${tokenInfo.nftinfo.nft_owner_seq}`); // 고쳐야 합니다
              }}
              src={ownerImage}
            />
          </BadgeLeft>
          <BadgeRight>
            <div
              onClick={() => {
                navigate(`/profile/${tokenInfo.nftinfo.nft_owner_seq}`); // 고쳐야 합니다
              }}
            >
              <LetterBox size="h3" weight="extraBold">
                {ownerName}
              </LetterBox>
            </div>
            <Button styleVariant="primary" onClick={showModal}>
              지갑 주소 확인하기
            </Button>
            <WalletAddressModal
              isDark={isDark}
              address={myTokenCreator}
            ></WalletAddressModal>
          </BadgeRight>
        </BadgeCenter> */}
      </div>
    </BadgeInfoPersonDiv>
  );
};
