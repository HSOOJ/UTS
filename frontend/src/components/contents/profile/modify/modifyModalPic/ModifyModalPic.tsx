import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import ImageInput from "../../../../containers/imageInput";

export const ModifyModalPic = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // function
  const onChange = (e: any) => {
    console.log(e);
    // setProfileStateVal({ ...profileStateVal, modifyUserProfileImage: e.path });
  };

  return (
    <>
      <div>
        <ImageInput onChange={onChange} title="프로필 이미지 업로드" />
      </div>
    </>
  );
};
