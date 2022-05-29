import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ThemeType } from "../../../../global/theme";
import { themeAtom } from "../../../../recoil/theme";
import { userState } from "../../../../recoil/user";

interface PropsType {
  following: string;
  userNickname: string;
  userProfileImage: string;
  userSeq: string;
  artistSeq: string;
}

export const FollowListCompo = ({
  following,
  userNickname,
  userProfileImage,
  userSeq,
  artistSeq,
}: PropsType) => {
  // recoil
  const isDark = useRecoilValue(themeAtom).isDark;
  const { login } = useRecoilValue(userState);

  // useState
  const [selected, setSelected] = useState(false);

  // useNavigate
  let navigate = useNavigate();

  // let
  let localStorageData = localStorage.getItem("userSeq");

  // Axios
  const PostFollow = (userTo: string, userFrom: string | null) => {
    axios
      .post("http://j6a105.p.ssafy.io:8080/api/artist/follow", {
        userTo,
        userFrom,
      })
      .then((res) => {
        console.log(res);
        console.log("post");
        setSelected(true);
      })
      .catch((res) => {
        console.log(userTo, userFrom);
        console.log(res);
      });
  };
  const DelFollow = (userTo: string, userFrom: string | null) => {
    axios
      .delete("http://j6a105.p.ssafy.io:8080/api/artist/unfollow", {
        data: {
          userTo,
          userFrom,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("del");
        setSelected(false);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // function
  const ButtonClickFollowing = () => {
    PostFollow(userSeq, localStorageData);
    setSelected(true);
  };
  const ButtonClickUnFollowing = () => {
    DelFollow(userSeq, localStorageData);
    setSelected(false);
  };

  // useEffect
  useEffect(() => {
    following === "y" ? setSelected(true) : setSelected(false);
  }, [following]);

  return (
    <>
      <Container>
        <Image
          src={userProfileImage}
          onClick={() => {
            navigate(`/artist/${artistSeq}`);
          }}
        />
        <Text
          isDark={isDark}
          onClick={() => {
            navigate(`/artist/${artistSeq}`);
          }}
        >
          {userNickname}
        </Text>
        {login ? (
          <ContainerRight>
            {selected ? (
              <Button
                isDark={isDark}
                isSelected={true}
                onClick={ButtonClickUnFollowing}
              >
                팔로잉
              </Button>
            ) : (
              <Button
                isDark={isDark}
                isSelected={false}
                onClick={ButtonClickFollowing}
              >
                팔로잉
              </Button>
            )}
          </ContainerRight>
        ) : null}
      </Container>
    </>
  );
};

// styled component
const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px;
`;
const ContainerRight = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  cursor: pointer;
`;
const Text = styled.div<ThemeType>`
  cursor: pointer;
  padding: 15px;
  font-size: 22px;
  font-weight: bold;
  color: ${({ isDark }) => (isDark ? "white" : "black")};
`;
const Button = styled.button<{
  isDark?: boolean;
  isSelected: boolean;
}>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 3px solid #3182f6;
  border-radius: 5px;
  color: ${({ isDark }) =>
    isDark
      ? ({ isSelected }) => (isSelected ? "#fff" : "white")
      : ({ isSelected }) => (isSelected ? "#fff" : "#3182f6")};
  background-color: ${({ isDark }) =>
    isDark
      ? ({ isSelected }) => (isSelected ? "#3182f6" : "none")
      : ({ isSelected }) => (isSelected ? "#3182f6" : "none")};
  display: inline;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 30px 15px 30px;
  margin: 0 10px 0 10px;
  position: relative;
  &:hover {
    color: ${({ isDark }) =>
      isDark
        ? ({ isSelected }) => (isSelected ? "black" : "#3182f6")
        : ({ isSelected }) => (isSelected ? "black" : "black")};
  }
  cursor: pointer;
`;
