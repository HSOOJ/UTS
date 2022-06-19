import { Col, Row } from "antd";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ProfileCompo from "../../../components/contents/profile";
import { profileState } from "../../../recoil/profile";

export const Profile = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useEffect
  useEffect(() => {
    setProfileStateVal({
      ...profileStateVal,
      userNickname: "",
      modifyNickname: "",
      modalVisible: false,
      nftBadgeList: true,
      tradeList: false,
      followList: false,
      ownList: true,
      sellingList: false,
      likeList: false,
    });
  }, []);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Layout>
            <ProfileCompo />
          </Layout>
        </Col>
      </Row>
    </>
  );
};

// styled component
const Layout = styled.div`
  /* width: 100%;
  margin: 1.5em auto 1.5em;
  border: solid 0.3em;
  border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  border-image-slice: 1;
  border-radius: 20px;
  padding: 0 0 0 2%; */
  padding-top: 50px;
`;
