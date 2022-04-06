import { useRecoilState } from "recoil";
import { profileState } from "../../../../recoil/profile";
import ModifyModalNickname from "./modifyModalNickname";
import { Button, message, Modal, Popconfirm } from "antd";
import { userState } from "../../../../recoil/user";
import ModifyModalPic from "./modifyModalPic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

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
        localStorage.removeItem("userProfileImage");
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
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const PutImage = (
    userSeq: string | null,
    userProfileImage: string | undefined | null
  ) => {
    axios
      .put("http://j6a105.p.ssafy.io:8080/api/user/edit/image", {
        userSeq,
        userProfileImage,
      })
      .then((res) => {
        console.log(
          "change profileImg / " + profileStateVal.modifyUserProfileImage
        );
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // function
  const handleCancel = () => {
    setProfileStateVal({ ...profileStateVal, modalVisible: false });
  };
  const modifyFunc = () => {
    if (profileStateVal.modifyNicknameCheck) {
      if (profileStateVal.userNickname !== profileStateVal.modifyNickname) {
        PutNickname(userSeq, profileStateVal.modifyNickname);
      }
      if (
        profileStateVal.userProfileImage !==
        profileStateVal.modifyUserProfileImage
      ) {
        PutImage(userSeq, profileStateVal.modifyUserProfileImage);
      }
      setProfileStateVal({
        ...profileStateVal,
        modalLoading: false,
        modalVisible: false,
        userNickname: profileStateVal.modifyNickname,
        userProfileImage: profileStateVal.modifyUserProfileImage,
      });
    } else {
      message.error("닉네임 중복확인을 해주세요!");
      setProfileStateVal({
        ...profileStateVal,
        modalLoading: false,
        modalVisible: true,
      });
    }
    console.log("profileStateVal.userProfileImage");
    console.log(profileStateVal.userProfileImage);
    console.log("profileStateVal.modifyUserProfileImage");
    console.log(profileStateVal.modifyUserProfileImage);
  };

  // click button _ modify
  const clickModifyDelete = () => {
    PutWidthdraw(userSeq);
  };
  const clickModifyButton = () => {
    setProfileStateVal({
      ...profileStateVal,
      modalLoading: true,
    });
    setTimeout(() => {
      modifyFunc();
    }, 1500);
  };

  // useEffect
  useEffect(() => {
    setProfileStateVal({
      ...profileStateVal,
      modifyNickname: profileStateVal.userNickname,
      modifyUserProfileImage: profileStateVal.userProfileImage,
    });
  }, []);
  useEffect(() => {
    if (profileStateVal.userNickname === profileStateVal.modifyNickname) {
      setProfileStateVal({ ...profileStateVal, modifyNicknameCheck: true });
    } else {
      setProfileStateVal({ ...profileStateVal, modifyNicknameCheck: false });
    }
  }, [profileStateVal.modifyNickname]);

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
            onClick={clickModifyButton}
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
