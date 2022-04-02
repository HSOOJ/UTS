import { Image } from "antd";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalPic = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // click button
  const clickModalModifyPic = () => {
    console.log("modify profile pic");
  };

  return (
    <>
      <div>
        <Image
          style={{ float: "left" }}
          width={200}
          src={profileStateVal.userProfileImage}
        />
        <div>{profileStateVal.userProfileImage}</div>
        <button onClick={clickModalModifyPic}>프로필 사진 수정</button>
      </div>
      {/* <div style={{ float: "left" }}>{profileStateVal.userProfileImage}</div>
      <button onClick={clickModalModifyPic}>프로필 사진 수정</button> */}
    </>
  );
};
