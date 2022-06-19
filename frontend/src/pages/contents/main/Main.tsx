import { Col, Row } from "antd";
import styled from "styled-components";
import HotArtist from "../../../components/contents/main/hotArtist";
import HotBadge from "../../../components/contents/main/hotBadge";
import { MainHeader } from "../../../components/contents/main/MainHeader";
import Onboarding from "../../../components/contents/main/onboarding";
import TopSeller from "../../../components/contents/main/topSeller";

const MainHeaderDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const Main = () => {
  return (
    <>
      <MainHeaderDiv>
        <MainHeader></MainHeader>
      </MainHeaderDiv>
      <Row>
        <Col span={16} offset={4}>
          <HotArtist />
          <HotBadge />
          <TopSeller />
          <Onboarding />
        </Col>
      </Row>
    </>
  );
};
