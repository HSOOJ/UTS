import { message, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import { profileState } from "../../../../../recoil/profile";
import Badge from "../../../../containers/badge";
import {
  BadgeList,
  ImgDiv,
  UserBackgroundImg,
  UserImg,
} from "./ArtistHeader.styled";

interface IArtistHeader extends ThemeType {
  // isFollow: boolean;
  artistUserId: string;
  artist_id: string;
  // getatuasr: ()=>void;
}

export const ArtistHeader = ({
  // isFollow,
  artistUserId,
  artist_id,
}: // getatuasr
IArtistHeader) => {
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);
  const profileStateVal = useRecoilValue(profileState);
  const [isFollow, setIsFollow] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    checkFollow();
  }, [isFollow]);

  const checkFollow = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow", // 고쳐야 합니다
      params: {
        userTo: artistUserId,
        userFrom: profileStateVal.userSeq,
      },
    })
      .then(function (res) {
        console.log(res);
        setIsFollow(res.data.success);
        setFollowArtist({ ...followArtist, followArtist: res.data.success });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const onClickFollow = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/follow", // 고쳐야 합니다
      data: {
        userTo: artistUserId,
        userFrom: profileStateVal.userSeq,
      },
    }).then(function (res) {
      setFollowArtist({ ...followArtist, followArtist: true });
      message.success("팔로우 되었습니다.");
    });
  };

  const onClickUnfollow = () => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/unfollow", // 고쳐야 합니다
      data: {
        userTo: artistUserId,
        userFrom: profileStateVal.userSeq,
      },
    }).then(function (res) {
      setFollowArtist({ ...followArtist, followArtist: false });

      message.error("팔로우가 취소되었습니다.");
    });
  };

  const onClickCheck = () => {
    message.info("UTS에서 인증하는 아티스트입니다.");
  };

  const onClickReport = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/report", // 고쳐야 합니다
      data: {
        userSeq: profileStateVal.userSeq,
        artistSeq: artist_id,
      },
    }).then(function (res) {
      setFollowArtist({ ...followArtist, followArtist: false });
      message.warning("해당 아티스트를 신고하였습니다.");
    });
  };

  return (
    <ImgDiv>
      <UserBackgroundImg src="https://picsum.photos/250/250"></UserBackgroundImg>
      <UserImg src="https://picsum.photos/250/250"></UserImg>
      <BadgeList>
        {isFollow === true ? (
          <div onClick={onClickUnfollow}>
            <Badge type="like" liked={true}></Badge>
          </div>
        ) : (
          <div onClick={onClickFollow}>
            <Badge type="like"></Badge>
          </div>
        )}
        <div onClick={onClickCheck}>
          <Badge type="verified"></Badge>
        </div>
        <Popconfirm
          title="해당 아티스트를 신고하시겠습니까?"
          onConfirm={onClickReport}
        >
          <div>
            <Badge type="report"></Badge>
          </div>
        </Popconfirm>
      </BadgeList>
    </ImgDiv>
  );
};
