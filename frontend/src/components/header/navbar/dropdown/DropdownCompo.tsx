import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, IdcardTwoTone } from "@ant-design/icons";
import { useEffect } from "react";
import { userState } from "../../../../recoil/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { profileState } from "../../../../recoil/profile";

export const DropdownCompo = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  let walletAddress = localStorage.getItem("userAccount")?.replace(/\"/gi, "");

  // router navigate
  let navigate = useNavigate();

  // click
  const clickProfile = () => {
    navigate(`/profile/${walletAddress}`);
    setProfileStateVal({
      ...profileStateVal,
      modifyVisible: true,
      clickProfile: !profileStateVal.clickProfile,
    });
  };
  const clickLogout = () => {
    console.log(`LOGOUT & Clear localStorage`);
    localStorage.removeItem("userAccount");
    setUserStateVal({ ...userStateVal, login: false });
    setProfileStateVal({
      ...profileStateVal,
      modifyVisible: false,
      clickProfile: !profileStateVal.clickProfile,
      userWallet: "",
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
            <div
              onClick={() => {
                navigate("/user");
              }}
            >
              Login
            </div>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  // useEffect
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      setUserStateVal({ ...userStateVal, login: false });
    } else {
      setUserStateVal({ ...userStateVal, login: true });
    }
  }, []);

  return (
    <>
      <Dropdown overlay={menu}>
        {userStateVal.login ? (
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </Dropdown>
    </>
  );
};
