import { Col, Row } from "antd";
import HotArtist from "../../../components/contents/main/hotArtist";
import HotBadge from "../../../components/contents/main/hotBadge";
import Onboarding from "../../../components/contents/main/onboarding";
import TopSeller from "../../../components/contents/main/topSeller";

export const Main = () => {
  return (
    <>
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
