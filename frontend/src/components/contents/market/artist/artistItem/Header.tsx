import { message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistState } from "../../../../../recoil/artist";
import { Badge } from "../../../../containers/badge/Badge";
import { BadgeLayOut, borderColor } from "./ArtistItem.styled";
import { BackgroundImage } from "./BackgroundImage";
import { ProfileImage } from "./ProfileImage";

interface IHeader extends ThemeType {
  backgroundSrc: string;
  profileSrc: string;
  userSeq: string;
  artistSeq: string;
}

export const Header = (api: IHeader) => {
  // recoil
  const [artistStateVal, setArtistStateVal] = useRecoilState(artistState);

  // useState
  const [following, setFollowing] = useState(false);

  // useNavigate
  let navigate = useNavigate();

  // Axios
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
        setFollowing(res.data.success);
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
        setFollowing(true);
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
        setFollowing(false);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // useEffect
  useEffect(() => {
    checkFollow(api.userSeq, localStorage.getItem("userSeq"));
  }, []);

  return (
    <BackgroundImage src={api.backgroundSrc}>
      <div
        onClick={() => {
          navigate(`/artist/${api.artistSeq}`);
        }}
      >
        <ProfileImage src={api.profileSrc} isDark={api.isDark} />
      </div>
      <BadgeLayOut>
        {following === true ? (
          <div
            onClick={() =>
              onClickUnfollow(api.userSeq, localStorage.getItem("userSeq"))
            }
          >
            <Badge
              key={api + ""}
              type="like"
              isDark={api.isDark}
              borderColor={
                api.isDark ? borderColor["dark"] : borderColor["light"]
              }
              liked={true}
            />
          </div>
        ) : (
          <div
            onClick={() =>
              onClickFollow(api.userSeq, localStorage.getItem("userSeq"))
            }
          >
            <Badge
              key={api + ""}
              type="like"
              isDark={api.isDark}
              borderColor={
                api.isDark ? borderColor["dark"] : borderColor["light"]
              }
              liked={false}
            />
          </div>
        )}
      </BadgeLayOut>
    </BackgroundImage>
  );
};
