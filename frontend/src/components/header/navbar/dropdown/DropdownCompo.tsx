import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { userState } from "../../../../recoil/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { profileState } from "../../../../recoil/profile";
import { ethers } from "ethers";
import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";

declare let window: any;

export const DropdownCompo = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // let
  let userSeq = localStorage.getItem("userSeq");

  // useNavigate
  let navigate = useNavigate();

  // function
  const metamaskLogin = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const balance = await provider.getBalance(signer.getAddress());
      window.localStorage.setItem(
        "userAccount",
        JSON.stringify(await signer.getAddress())
      );
      console.log("Account:", await signer.getAddress());

      AxiosSignup(await signer.getAddress());
    } catch (err) {
      alert("Metamask 연결이 필요합니다!");
    }
  };
  const AxiosSignup = (walletAddress: string) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/user/join",
      data: {
        userWalletAddress: walletAddress,
      },
    })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("userSeq", res.data.success.userSeq);
        localStorage.setItem(
          "userProfileImage",
          res.data.success.userProfileImage
        );
        setProfileStateVal({
          ...profileStateVal,
          userRole: res.data.success.userRole,
          userWallet: localStorage.getItem("userAccount")?.replace(/\"/gi, ""),
          userSeq: localStorage.getItem("userSeq"),
          userProfileImage: localStorage.getItem("userProfileImage"),
          modifyUserProfileImage: localStorage.getItem("userProfileImage"),
        });
        setUserStateVal({ ...userStateVal, login: true });
      })
      .catch((res) => {
        console.log(res);
        alert("회원가입&로그인 실패... Metamask 연결이 필요합니다!");
      });
  };

  // click
  const clickProfile = () => {
    setProfileStateVal({
      ...profileStateVal,
      clickProfile: !profileStateVal.clickProfile,
    });
    if (userSeq === undefined || userSeq === null) {
      console.log("userSeq is undefined OR null");
      clickLogout();
    }
    navigate(`/profile/${userSeq}`);
  };
  const clickLogout = () => {
    console.log(`LOGOUT & Clear localStorage`);
    localStorage.removeItem("userAccount");
    localStorage.removeItem("userSeq");
    localStorage.removeItem("userProfileImage");
    setUserStateVal({ ...userStateVal, login: false });
    setProfileStateVal({
      ...profileStateVal,
      userRole: 0,
      clickProfile: !profileStateVal.clickProfile,
      userWallet: "",
      userSeq: "",
    });
  };

  const menu = (
    <Menu>
      {userStateVal.login ? (
        <>
          <Menu.Item key="1">
            <div onClick={clickProfile}>Profile</div>
          </Menu.Item>
          <Menu.Item key="2">
            <div onClick={clickLogout}>Logout</div>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="1">
            <div onClick={metamaskLogin}>Login</div>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  // useEffect
  useEffect(() => {}, []);

  return (
    <>
      <Dropdown overlay={menu}>
        {userStateVal.login ? (
          // <Avatar
          //   style={{ backgroundColor: "#87d068" }}
          //   icon={<UserOutlined />}
          // />
          <Image
            src={
              profileStateVal.userProfileImage
                ? profileStateVal.userProfileImage
                : undefined
            }
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </Dropdown>
    </>
  );
};

// styled component
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 30px;
`;
