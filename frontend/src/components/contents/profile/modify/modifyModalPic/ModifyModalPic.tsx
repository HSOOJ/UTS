import { useRecoilState } from "recoil";
import { onFileChange } from "../../../../../hooks/minting";
import { profileState } from "../../../../../recoil/profile";
import ImageInput from "../../../../containers/imageInput";

export const ModifyModalPic = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // function
  const onChange = (file: any) => {
    onFileChange(file).then((url) => {
      setProfileStateVal({ ...profileStateVal, modifyUserProfileImage: url });
    });
  };

  return (
    <>
      <div>
        {/* <ImageInput onChange={onChange} title="프로필 이미지 업로드" /> */}
        <ImageInput onChange={onChange} title="프로필 이미지 업로드" />
      </div>
    </>
  );
};
