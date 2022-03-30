import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import Like from "./like";
import Own from "./own";
import Selling from "./selling";
import styled from "styled-components";

export const NftBadgeList = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // click button
  const clickOwn = () => {
    setProfileStateVal({
      ...profileStateVal,
      ownList: true,
      sellingList: false,
      likeList: false,
    });
  };
  const clickSelling = () => {
    setProfileStateVal({
      ...profileStateVal,
      ownList: false,
      sellingList: true,
      likeList: false,
    });
  };
  const clickLike = () => {
    setProfileStateVal({
      ...profileStateVal,
      ownList: false,
      sellingList: false,
      likeList: true,
    });
  };

  // useEffect
  useEffect(() => {
    setProfileStateVal({
      ...profileStateVal,
      ownList: true,
      sellingList: false,
      likeList: false,
    });
  }, []);

  return (
    <>
      <ButtonSelect isSelected={profileStateVal.ownList} onClick={clickOwn}>
        보유중
      </ButtonSelect>
      <ButtonSelect
        isSelected={profileStateVal.sellingList}
        onClick={clickSelling}
      >
        판매중
      </ButtonSelect>
      <ButtonSelect isSelected={profileStateVal.likeList} onClick={clickLike}>
        좋아요
      </ButtonSelect>
      {profileStateVal.ownList ? <Own /> : null}
      {profileStateVal.sellingList ? <Selling /> : null}
      {profileStateVal.likeList ? <Like /> : null}
    </>
  );
};

// styled component
const ButtonSelect = styled.button<{ isSelected: boolean }>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 2px solid #177ddc;
  border-radius: 5px;
  color: ${(props) => (props.isSelected ? "#177ddc" : "#fff")};
  display: inline;
  font-size: 15px;
  font-weight: bold;
  padding: 15px 60px 15px 60px;
  margin: 0 10px 0 10px;
  position: relative;
  &:hover {
    color: #177ddc;
  }
`;
