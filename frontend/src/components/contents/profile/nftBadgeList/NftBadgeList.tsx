import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../../../recoil/profile";
import Like from "./like";
import Own from "./own";
import Selling from "./selling";
import styled from "styled-components";
import { themeAtom } from "../../../../recoil/theme";

export const NftBadgeList = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);
  const isDark = useRecoilValue(themeAtom).isDark;

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
      <ButtonSelect
        isDark={isDark}
        isSelected={profileStateVal.ownList}
        onClick={clickOwn}
      >
        보유중
      </ButtonSelect>
      <ButtonSelect
        isDark={isDark}
        isSelected={profileStateVal.sellingList}
        onClick={clickSelling}
      >
        판매중
      </ButtonSelect>
      <ButtonSelect
        isDark={isDark}
        isSelected={profileStateVal.likeList}
        onClick={clickLike}
      >
        좋아요
      </ButtonSelect>
      <LayoutPadding>
        {profileStateVal.ownList ? <Own /> : null}
        {profileStateVal.sellingList ? <Selling /> : null}
        {profileStateVal.likeList ? <Like /> : null}
      </LayoutPadding>
    </>
  );
};

// styled component
const ButtonSelect = styled.button<{ isDark?: boolean; isSelected: boolean }>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 2px solid #177ddc;
  border-radius: 5px;
  // color: ${(props) => (props.isSelected ? "#177ddc" : "#fff")};
  color: ${({ isDark }) =>
    isDark
      ? ({ isSelected }) => (isSelected ? "#177ddc" : "#fff")
      : ({ isSelected }) => (isSelected ? "#177ddc" : "black")};
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
const LayoutPadding = styled.div`
  padding: 30px 0 20px 0;
`;
