import { Image } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import ImageInput from "../../../../containers/imageInput";

export const ModifyModalPic = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let userSeq = localStorage.getItem("userSeq");

  // Axios
  // const PutImage = (
  //   userSeq: string | null,
  //   userProfileImage: string | undefined
  // ) => {
  //   axios
  //     .put("http://j6a105.p.ssafy.io:8080/api/user/edit/image", {
  //       userSeq,
  //       userProfileImage,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // };

  // function
  const onChange = (e: any) => {
    console.log(e);
    setProfileStateVal({ ...profileStateVal, modifyUserProfileImage: e.path });
  };

  // click button
  // const clickModalModifyPic = () => {
  //   console.log("modify profile pic");
  //   PutImage(userSeq, profileStateVal.userProfileImage);
  // };

  // useEffect
  useEffect(() => {
    setProfileStateVal({
      ...profileStateVal,
      modifyUserProfileImage: profileStateVal.userProfileImage,
    });
  }, []);

  return (
    <>
      <div>
        {/* <Image
          style={{ float: "left" }}
          width={200}
          src={profileStateVal.modifyUserProfileImage}
        />
        <div>{profileStateVal.modifyUserProfileImage}</div> */}
        {/* <button onClick={clickModalModifyPic}>프로필 사진 수정</button> */}
        <ImageInput onChange={onChange} title="프로필 이미지 업로드" />
      </div>
    </>
  );
};
