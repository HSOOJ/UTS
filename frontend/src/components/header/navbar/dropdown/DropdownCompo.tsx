import { Menu, Dropdown } from "antd";
import { UserOutlined, IdcardTwoTone } from "@ant-design/icons";
import { useEffect } from "react";
import { userState } from "../../../../recoil/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export const DropdownCompo = () => {
  // recoil
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // router navigate
  let navigate = useNavigate();

  const clickLogout = () => {
    console.log(`LOGOUT & Clear localStorage`);
    localStorage.clear();
    setUserStateVal({ ...userStateVal, login: false });
  };

  const menu = (
    <Menu>
      {userStateVal.login ? (
        <>
          <Menu.Item key="1">
            <div
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </div>
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
        {userStateVal.login ? <IdcardTwoTone /> : <UserOutlined />}
      </Dropdown>
    </>
  );
};
