import { Image } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalPic = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let userSeq = localStorage.getItem("userSeq");

  // Axios
  const PutImage = (
    userSeq: string | null,
    userProfileImage: string | undefined
  ) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/edit/image", {
        userSeq,
        userProfileImage,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // click button
  const clickModalModifyPic = () => {
    console.log("modify profile pic");
    PutImage(userSeq, profileStateVal.userProfileImage);
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
    </>
  );
};
