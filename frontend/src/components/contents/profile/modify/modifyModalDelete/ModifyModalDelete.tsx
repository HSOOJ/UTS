import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";
import { userState } from "../../../../../recoil/user";

export const ModifyModalDelete = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // click button
  const clickModifyDelete = () => {
    console.log(`SUCCESS Delete Account\n${profileStateVal.userNickname}`);
    localStorage.clear();
    setUserStateVal({ ...userStateVal, login: false, loginForm: true });
    setProfileStateVal({
      ...profileStateVal,
      modifyModal: false,
      modifyModalDelete: false,
    });
  };

  return (
    <>
      <hr />
      <h2>정말로 탈퇴하시겠습니까?</h2>
      <h3>UTS에서 당신의 아티스트가 기다리고 있어요.</h3>
      <h3>탈퇴 시 회원님이 보유한 NFT 토큰도 폐기됩니다. (복구불가)</h3>
      <button
        onClick={() => {
          setProfileStateVal({ ...profileStateVal, modifyModalDelete: false });
        }}
      >
        아니요, 실수에요!
      </button>
      <button onClick={clickModifyDelete}>탈퇴할게요.</button>
    </>
  );
};
