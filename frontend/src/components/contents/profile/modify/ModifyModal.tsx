import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import { ModifyModalDelete } from "./modifyModalDelete/ModifyModalDelete";
import ModifyModalNickname from "./modifyModalNickname";

export const ModifyModal = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // click button
  const clickModifyPic = () => {
    console.log("modify profile pic");
  };
  const clickModifyNickname = () => {
    console.log("modify nickname");
    setProfileStateVal({ ...profileStateVal, modifyModalNickname: true });
  };

  return (
    <>
      <hr />
      <h3>Modify Modal Component</h3>
      <button
        onClick={() => {
          setProfileStateVal({ ...profileStateVal, modifyModal: false });
        }}
      >
        exit
      </button>
      <button onClick={clickModifyPic}>프로필 사진 수정</button>
      <button onClick={clickModifyNickname}>닉네임 수정</button>
      <button
        onClick={() => {
          setProfileStateVal({ ...profileStateVal, modifyModalDelete: true });
        }}
      >
        회원탈퇴
      </button>

      {profileStateVal.modifyModalNickname ? <ModifyModalNickname /> : null}

      {profileStateVal.modifyModalDelete ? <ModifyModalDelete /> : null}
    </>
  );
};
