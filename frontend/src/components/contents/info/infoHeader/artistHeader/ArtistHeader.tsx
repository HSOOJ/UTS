import { message } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import Badge from "../../../../containers/badge";

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 75px;
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

interface IArtistHeader extends ThemeType {
  isFollow: boolean;
}

export const ArtistHeader = ({ isFollow }: IArtistHeader) => {
  const [followArtist, setFollowArtist] = useRecoilState(artistDetailState);

  const onClickFollow = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/follow",
      data: {
        userTo: "2",
        userFrom: "33",
      },
    }).then(function (res) {
      setFollowArtist({ ...followArtist, followArtist: true });
      message.success("팔로우 되었습니다.");
    });
  };

  const onClickUnfollow = () => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/artist/unfollow",
      data: {
        userTo: "2",
        userFrom: "33",
      },
    }).then(function (res) {
      setFollowArtist({ ...followArtist, followArtist: false });
      message.error("팔로우가 취소되었습니다.");
    });
  };

  const onClickCheck = () => {
    message.info("UTS에서 인증하는 아티스트입니다.");
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
        <Badge type="report"></Badge>
      </BadgeList>
    </ImgDiv>
  );
};
