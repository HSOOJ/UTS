import { message, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistState } from "../../../../../recoil/artist";
import { profileState } from "../../../../../recoil/profile";
import Badge from "../../../../containers/badge";
import {
  BadgeList,
  ImgDiv,
  UserBackgroundImg,
  UserImg,
} from "./ArtistHeader.styled";

interface PropsType {
  artistId?: string;
  editionId?: string;
}

export const ArtistHeader = ({ artistId, editionId }: PropsType) => {
  // recoil
  const [artistStateVal, setArtistStateVal] = useRecoilState(artistState);
  const profileStateVal = useRecoilValue(profileState);

  // useNavigate
  let navigate = useNavigate();

  // useState
  const [userTo, setUserTo] = useState<string | undefined>();
  const [artistTo, setArtistTo] = useState<string | undefined>();
  const [userImage, setUserImage] = useState("");

  // Axios
  const getArtistInfo = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/info",
      params: {
        artistSeq: artistId,
      },
    })
      .then(function (res) {
        // console.log(res);
        checkFollow(res.data.success.artist_user_seq, profileStateVal.userSeq);
        setUserTo(res.data.success.artist_user_seq);
        setArtistTo(artistId);
        setUserImage(res.data.success.user_user_profile_image);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const getEditionDetail = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/edition/info",
      params: {
        editionSeq: editionId,
      },
    })
      .then(function (res) {
        // console.log(res);
        checkFollow(res.data.success.artist_user_seq, profileStateVal.userSeq);
        setUserTo(res.data.success.artist_user_seq);
        setArtistTo(res.data.success.artist_seq);
        setUserImage(res.data.success.artist_image);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const onClickFollow = (
    userTo: string | undefined,
    userFrom: string | null | undefined
  ) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/follow",
      data: {
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
      });
  };
  const onClickUnfollow = (
    userTo: string | undefined,
    userFrom: string | null | undefined
  ) => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/unfollow",
      data: {
        userTo,
        userFrom,
      },
    })
      .then(function (res) {
        setArtistStateVal({ ...artistStateVal, following: false });
        message.error("팔로우가 취소되었습니다.");
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const onClickCheck = () => {
    message.info("UTS에서 인증하는 아티스트입니다.");
  };
  const onClickReport = (
    userSeq: string | null | undefined,
    artistSeq: string | undefined
  ) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/report",
      data: {
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

  // function
  const onClickImg = () => {
    if (artistId !== undefined) navigate(`/artist/${artistId}`);
    if (editionId !== undefined) navigate(`/artist/${artistTo}`);
  };

  // useEffect
  useEffect(() => {
    if (artistId !== undefined) getArtistInfo();
    if (editionId !== undefined) getEditionDetail();
  }, []);

  return (
    <ImgDiv>
      <UserBackgroundImg
        src={userImage}
        onClick={onClickImg}
      ></UserBackgroundImg>
      <UserImg src={userImage} onClick={onClickImg}></UserImg>
      <BadgeList>
        {profileStateVal.userSeq ? (
          <>
            {artistStateVal.following === true ? (
              <div
                onClick={() => onClickUnfollow(userTo, profileStateVal.userSeq)}
              >
                <Badge type="like" liked={true}></Badge>
              </div>
            ) : (
              <div
                onClick={() => onClickFollow(userTo, profileStateVal.userSeq)}
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
          onConfirm={() => onClickReport(profileStateVal.userSeq, artistTo)}
        >
          <div>
            <Badge type="report"></Badge>
          </div>
        </Popconfirm>
      </BadgeList>
    </ImgDiv>
  );
};
