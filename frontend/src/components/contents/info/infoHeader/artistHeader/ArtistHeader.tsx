import { ConsoleSqlOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistState } from "../../../../../recoil/artist";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import { profileState } from "../../../../../recoil/profile";
import Badge from "../../../../containers/badge";
import {
  BadgeList,
  ImgDiv,
  UserBackgroundImg,
  UserImg,
} from "./ArtistHeader.styled";

// interface IArtistHeader extends ThemeType {
//   artistUserId: string | number;
//   artist_id: string | number;
// }

export const ArtistHeader = () => {
  // export const ArtistHeader = ({ artistUserId, artist_id }: IArtistHeader) => {
  // recoil
  const [artistStateVal, setArtistStateVal] = useRecoilState(artistState);
  const profileStateVal = useRecoilValue(profileState);

  // useState
  const [isFollow, setIsFollow] = useState(false);

  // Axios
  const onClickFollow = (
    userTo: string,
    userFrom: string | null | undefined
  ) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/follow",
      data: {
        // userTo: artistUserId,
        // userFrom: profileStateVal.userSeq,
        userTo,
        userFrom,
      },
    })
      .then(function (res) {
        // console.log(res);
        message.success("팔로우 되었습니다.");
        setArtistStateVal({ ...artistStateVal, following: true });
      })
      .catch((res) => {
        // console.log(res);
        checkFollow(artistStateVal.artistUserSeq, profileStateVal.userSeq);
      });
  };
  const onClickUnfollow = (
    userTo: string,
    userFrom: string | null | undefined
  ) => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/unfollow",
      data: {
        // userTo: artistUserId,
        // userFrom: profileStateVal.userSeq,
        userTo,
        userFrom,
      },
    })
      .then(function (res) {
        setArtistStateVal({ ...artistStateVal, following: false });
        message.error("팔로우가 취소되었습니다.");
      })
      .catch((res) => {
        // console.log(res);
        checkFollow(artistStateVal.artistUserSeq, profileStateVal.userSeq);
      });
  };
  const onClickCheck = () => {
    message.info("UTS에서 인증하는 아티스트입니다.");
  };
  const onClickReport = (
    userSeq: string | null | undefined,
    artistSeq: string
  ) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/report", // 고쳐야 합니다
      data: {
        // userSeq: profileStateVal.userSeq,
        // artistSeq: artist_id,
        userSeq,
        artistSeq,
      },
    }).then(function (res) {
      message.warning("해당 아티스트를 신고하였습니다.");
    });
  };
  const checkFollow = (
    userTo: string | number,
    userFrom: string | null | undefined
  ) => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/check/follow",
      params: {
        userTo,
        userFrom,
      },
    })
      .then(function (res) {
        // console.log(res);
        setArtistStateVal({ ...artistStateVal, following: res.data.success });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // useEffect
  useEffect(() => {
    checkFollow(artistStateVal.artistUserSeq, profileStateVal.userSeq);
  }, []);

  return (
    <ImgDiv>
      <UserBackgroundImg src="https://picsum.photos/250/250"></UserBackgroundImg>
      <UserImg src="https://picsum.photos/250/250"></UserImg>
      <BadgeList>
        {profileStateVal.userSeq ? (
          <>
            {artistStateVal.following === true ? (
              <div
                onClick={() =>
                  onClickUnfollow(
                    artistStateVal.artistUserSeq,
                    profileStateVal.userSeq
                  )
                }
              >
                <Badge type="like" liked={true}></Badge>
              </div>
            ) : (
              <div
                onClick={() =>
                  onClickFollow(
                    artistStateVal.artistUserSeq,
                    profileStateVal.userSeq
                  )
                }
              >
                <Badge type="like"></Badge>
              </div>
            )}
          </>
        ) : null}
        <div onClick={onClickCheck}>
          <Badge type="verified"></Badge>
        </div>
        <Popconfirm
          title="해당 아티스트를 신고하시겠습니까?"
          onConfirm={() =>
            onClickReport(profileStateVal.userSeq, artistStateVal.artistSeq)
          }
        >
          <div>
            <Badge type="report"></Badge>
          </div>
        </Popconfirm>
      </BadgeList>
    </ImgDiv>
  );
};
