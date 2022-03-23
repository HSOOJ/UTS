import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import Like from "./like";
import Own from "./own";
import Selling from "./selling";

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
      <h1>NFT badge List</h1>
      <button onClick={clickOwn}>보유중</button>
      <button onClick={clickSelling}>판매중</button>
      <button onClick={clickLike}>좋아요</button>
      {profileStateVal.ownList ? <Own /> : null}
      {profileStateVal.sellingList ? <Selling /> : null}
      {profileStateVal.likeList ? <Like /> : null}
    </>
  );
};
