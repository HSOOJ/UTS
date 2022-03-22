import styled from "styled-components";
import { Timeline } from "antd";
import { Collapse } from "antd";

export const AboutPage = () => {
  const { Panel } = Collapse;

  const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
  `;

  const Text = styled.h1`
    /* color: white; */
    display: flex;
    justify-content: center;
  `;

  return (
    <div>
      <BackgroundImg src="img/about_1.jpg" />
      <Text>당신의 아티스트와 더욱 가까워지는 방법</Text>
      <br></br>
      <Text>ROADMAP</Text>
      <br></br>
      <div>
        <Timeline mode="alternate">
          <Timeline.Item position="left">
            <p>EXPLORE YOUR ARTIST</p>
            <p>
              Artist 탭에서 당신의 아티스트를 찾아보세요. 당신의 아티스트가
              뱃지를 판매하고 있다면, 뱃지의 정보를 확인해보세요. 당신만을 위한
              특별한 뱃지가 기다리고 있을거에요! 💌
            </p>
          </Timeline.Item>
          <Timeline.Item color="green">
            <p>BUY BADGES WHAT YOU LIKE</p>
            <p>
              나만을 위한 뱃지를 발견했다구요? 😮 METAMASK를 통해서 뱃지를
              구매해보세요. 아티스트를 위한 직접적인 후원이 가능해집니다.
            </p>
          </Timeline.Item>
          <Timeline.Item color="red">
            <p>CHECK YOUR WALLET</p>
            <p>
              WALLET에 보관되어있는 당신의 뱃지를 확인해보세요. 프로필 사진을
              클릭하면, 나의 뱃지 컬렉션을 확인할 수 있습니다. 컬렉션에 몇 개의
              뱃지를 모을 수 있냐구요? 걱정마세요 😁, 제한이 없습니다!
            </p>
          </Timeline.Item>
          <Timeline.Item>
            <p>SELL BADGES</p>
            <p>
              더이상 사용하지 않는 뱃지가 있으시다면, BADGE 탭에서 되팔아보세요.
              당신의 뱃지가 특별해서 구매가보다 높게 판매된다면, 저희에게 치킨
              한 마리, 쏘시는거죠? 🔫
            </p>
          </Timeline.Item>
        </Timeline>
      </div>
      <br></br>
      <Text>FAQ</Text>
      <br></br>
      <div>
        <Collapse accordion>
          <Panel header="MYAH는 무엇인가요?" key="1">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="MYAH에서 뱃지를 어떻게 구매하나요?" key="2">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="뱃지를 구매하면 얻을 수 있는 이익이 있나요?" key="3">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="어떤 뱃지가 희귀한가요?" key="4">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="구매한 뱃지는 어디서 확인할 수 있나요?" key="5">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="되팔고싶은 뱃지는 어떻게 해야할까요?" key="6">
            <p>
              MYAH는 Meet Your Artist Here의 줄임말로, 아티스트에게 직접적인
              후원을 할 수 있는 NFT 토큰을 판매하는 마켓플레이스입니다.
            </p>
          </Panel>
          <Panel header="아티스트가 되고싶어요. 방법을 알려주세요." key="7">
            <p>
              아티스트이신가요? 여기를 눌러 아티스트 신청서를 제출해주세요.
              관리자 검토 후 2~3일 이내(공휴일 제외)에 신청 결과를 메일로
              알려드립니다.
            </p>
          </Panel>
        </Collapse>
        <BackgroundImg src="img/about_2.jpg" />
      </div>
    </div>
  );
};
