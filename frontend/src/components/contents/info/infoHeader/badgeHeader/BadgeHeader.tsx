import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { profileState } from "../../../../../recoil/profile";
import Badge from "../../../../containers/badge";

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 60px;
`;
const UserBackgroundImg = styled.img`
  border-radius: 3%;
  filter: blur(2px);
  width: 700px;
  height: 250px;
`;

const UserImg = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 100px;
  width: 200px;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 235px;
  right: 50px;
`;

interface IBadgeHeader extends ThemeType {
  badge_id: string;
  tokenInfo: any;
}

export const BadgeHeader = ({ badge_id, tokenInfo }: IBadgeHeader) => {
  // recoil
  const [likeBadge, setLikeBadge] = useRecoilState(badgeDetailState);
  const profileStateVal = useRecoilValue(profileState);
  // console.log(tokenInfo.editioninfo[0].Edition_artist_seq)
  const [headerImage, setHeaderImage] = useState("");

  // useState
  const [like, setLike] = useState(false);

  // Axios
  const checkLike = (userSeq: string | null | undefined, nftSeq: string) => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/check/heart", // 고쳐야 합니다
      params: {
        // userSeq: profileStateVal.userSeq,
        // nftSeq: badge_id,
        userSeq,
        nftSeq,
      },
    })
      .then(function (res) {
        setLike(res.data.success);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const onClickLike = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/like",
      data: {
        userSeq: profileStateVal.userSeq, // 고쳐야 합니다.
        nftSeq: badge_id,
      },
    }).then(function (res) {
      setLike(true);
      message.success("좋아요 되었습니다.");
    });
  };
  const onClickDislike = () => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/unlike",
      data: {
        userSeq: profileStateVal.userSeq, // 고쳐야 합니다.
        nftSeq: badge_id,
      },
    }).then(function (res) {
      setLike(false);
      message.error("좋아요가 취소되었습니다.");
    });
  };
  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://j6a105.p.ssafy.io:8080/api/nft/info?nftSeq=${badge_id}`
    }).then((res) => {
      setHeaderImage(res.data.success.editioninfo[0].Edition_edition_image)
      console.log("imageurl", res.data.success.editioninfo[0].Edition_edition_image)
    })
  }
  // useEffect
  useEffect(() => {
    checkLike(profileStateVal.userSeq, badge_id);
    // setHeaderImage(tokenInfo.editioninfo[0].Edition_edition_image);
    getNftInfo()
  }, []);
  

  return (
    <ImgDiv>
      <>
      {headerImage ? (
        <>
          <UserBackgroundImg src={headerImage}></UserBackgroundImg>
          <UserImg width="200px" height="200px" src={headerImage}></UserImg>
        </>
        ) : (
          <>
        <UserBackgroundImg src=""></UserBackgroundImg>
        <UserImg src=""></UserImg>  
          </>
      )
      
    }
      </>
      <BadgeList>
        {profileStateVal.userSeq ? (
          <>
            {like === true ? (
              <div onClick={onClickDislike}>
                <Badge type="like" liked={true}></Badge>
              </div>
            ) : (
              <div onClick={onClickLike}>
                <Badge type="like"></Badge>
              </div>
            )}
          </>
        ) : null}
      </BadgeList>
    </ImgDiv>
  );
};
