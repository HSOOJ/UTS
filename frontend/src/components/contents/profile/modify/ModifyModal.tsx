import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import ModifyModalNickname from "./modifyModalNickname";
import { Button, Modal, Popconfirm } from "antd";
import { userState } from "../../../../recoil/user";
import ModifyModalPic from "./modifyModalPic";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ModifyModal = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let userSeq = localStorage.getItem("userSeq");

  // useNavigate
  const naviagate = useNavigate();

  // Axios
  const PutWidthdraw = (userSeq: string | null) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/withdraw", {
        userSeq,
      })
      .then(() => {
        console.log(`SUCCESS Delete Account\n${profileStateVal.userNickname}`);
        localStorage.removeItem("userAccount");
        localStorage.removeItem("userSeq");
        setUserStateVal({ ...userStateVal, login: false });
        setProfileStateVal({
          ...profileStateVal,
          modalVisible: false,
        });
        naviagate("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const PutNickname = (userSeq: string | null, userNickname: string | null) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/edit/nickname", {
        userSeq,
        userNickname,
      })
      .then(() => {
        console.log("change nickname / " + profileStateVal.modifyNickname);
        setProfileStateVal({
          ...profileStateVal,
          modalLoading: true,
        });
        setTimeout(() => {
          setProfileStateVal({
            ...profileStateVal,
            modalLoading: false,
            modalVisible: false,
            userNickname: profileStateVal.modifyNickname,
          });
        }, 1500);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // function
  const handleCancel = () => {
    setProfileStateVal({ ...profileStateVal, modalVisible: false });
  };

  // click button _ modify
  const clickModifyDelete = () => {
    PutWidthdraw(userSeq);
  };
  const clickModifyNicknameChange = () => {
    PutNickname(userSeq, profileStateVal.modifyNickname);
  };

  return (
    <>
      <Modal
        visible={profileStateVal.modalVisible}
        title="프로필 수정"
        centered
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            title="정말로 탈퇴하시겠습니까?"
            onConfirm={clickModifyDelete}
            okText="네"
            cancelText="아니요"
            key="0"
          >
            <Button danger>회원탈퇴</Button>
          </Popconfirm>,
          <Button
            type="primary"
            loading={profileStateVal.modalLoading}
            onClick={clickModifyNicknameChange}
            key="1"
          >
            수정하기
          </Button>,
        ]}
      >
        <ModifyModalPic key="0" />

        <ModifyModalNickname key="1" />
      </Modal>
    </>
  );
};
