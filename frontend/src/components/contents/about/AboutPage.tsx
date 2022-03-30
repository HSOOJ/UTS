import styled from "styled-components";
import { Timeline } from "antd";
import { Collapse } from "antd";
import LetterBox from "../../containers/letterBox/LetterBox";
import { ThemeType } from "../../../global/theme";
import { themeAtom } from "../../../recoil/theme";
import { useRecoilValue } from "recoil";

const AboutMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: relative; */
`;

const CenterText = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const FirstImg = styled.div`
  position: relative;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(80%);
`;

const Text = styled.h1`
  color: white;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 80px;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-weight: bold;
  letter-spacing: 5px;
`;

const AboutExplainDiv = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TimeLineTitleText = styled.p<ThemeType>`
  margin-top: 10px;
  color: ${({ isDark }) =>
    isDark
      ? `#759AFF
`
      : `black`};
  font-size: 20px;
`;

const TimeLineText = styled.p<ThemeType>`
  color: ${({ isDark }) => (isDark ? `white` : `black`)};
`;

// 리코일로 isDark 가져오기,
export const AboutPage = () => {
  const { Panel } = Collapse;
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <AboutMainDiv>
      <FirstImg>
        <BackgroundImg src="img/about_1.jpg" />
        <Text>
          당신의 아티스트와 <br />
          더욱 가까워지는 방법
        </Text>
      </FirstImg>
      <br></br>
      <CenterText>
        <LetterBox size="h1" weight="extraBold">
          ROADMAP
        </LetterBox>
      </CenterText>
      <br></br>
      <AboutExplainDiv>
        <div>
          <Timeline mode="alternate">
            <Timeline.Item position="left">
              <TimeLineTitleText isDark={isDark}>
                EXPLORE YOUR ARTIST
              </TimeLineTitleText>
              <TimeLineText isDark={isDark}>
                Artist 탭에서 당신의 아티스트를 찾아보세요. 당신의 아티스트가
                뱃지를 판매하고 있다면, 뱃지의 정보를 확인해보세요. 당신만을
                위한 특별한 뱃지가 기다리고 있을거에요! 💌
              </TimeLineText>
            </Timeline.Item>
            <Timeline.Item color="green">
              <TimeLineTitleText isDark={isDark}>
                BUY BADGES WHAT YOU LIKE
              </TimeLineTitleText>
              <TimeLineText isDark={isDark}>
                나만을 위한 뱃지를 발견했다구요? 😮 METAMASK를 통해서 뱃지를
                구매해보세요. 아티스트를 위한 직접적인 후원이 가능해집니다.
              </TimeLineText>
            </Timeline.Item>
            <Timeline.Item color="red">
              <TimeLineTitleText isDark={isDark}>
                CHECK YOUR WALLET
              </TimeLineTitleText>
              <TimeLineText isDark={isDark}>
                WALLET에 보관되어있는 당신의 뱃지를 확인해보세요. 프로필 사진을
                클릭하면, 나의 뱃지 컬렉션을 확인할 수 있습니다. 컬렉션에 몇
                개의 뱃지를 모을 수 있냐구요? 걱정마세요 😁, 제한이 없습니다!
              </TimeLineText>
            </Timeline.Item>
            <Timeline.Item>
              <TimeLineTitleText isDark={isDark}>SELL BADGES</TimeLineTitleText>
              <TimeLineText isDark={isDark}>
                더이상 사용하지 않는 뱃지가 있으시다면, BADGE 탭에서
                되팔아보세요. 당신의 뱃지가 특별해서 구매가보다 높게 판매된다면,
                저희에게 치킨 한 마리, 쏘시는거죠? 🔫
              </TimeLineText>
            </Timeline.Item>
          </Timeline>
        </div>
        <br></br>
        <CenterText>
          <LetterBox size="h1" weight="extraBold">
            FAQ
          </LetterBox>
        </CenterText>
        <br></br>
        <div>
          <Collapse accordion>
            <Panel header="UTS는 무엇인가요?" key="1">
              <p>
                UTS는 Under The Sea의 줄임말로, Artist분께 직접적인 후원을 할 수
                있는 NFT 토큰을 판매하는 마켓플레이스입니다.
              </p>
            </Panel>
            <Panel header="UTS에서 뱃지를 어떻게 구매하나요?" key="2">
              <p>
                UTS에 입장하고 Metamask에 로그인하면 준비 완료! 😃 Artist 탭이나
                Badge 탬에 들어가시면 회원님의 Artist Badge를 구해하실 수
                있습니다.
              </p>
            </Panel>
            <Panel header="뱃지를 구매하면 얻을 수 있는 이익이 있나요?" key="3">
              <p>
                Artist분이 민팅을 할 때 해당 뱃지에 대한 혜택을 작성해두었을
                것입니다. 만약 없다면 UTS 문제가 아닌 Artist가 혜택을 설정하지
                않은 것 뿐이에요...
              </p>
            </Panel>
            <Panel header="어떤 뱃지가 희귀한가요?" key="4">
              <p>
                여러분의 선택에 맡깁니다. 여러분이 '희귀하다' 생각하는 뱃지는
                희귀한거에요. 숫자가 특이한(1번, 1004번 등) Badge가 희귀할 수도
                있고, Artist 분이 설정한 Badge의 개수가 적을 수록 희귀할 수도
                있겠죠?
              </p>
            </Panel>
            <Panel header="구매한 뱃지는 어디서 확인할 수 있나요?" key="5">
              <p>구매한 Badge는 개인 Profile에서 확인할 수 있습니다.</p>
            </Panel>
            <Panel header="되팔고 싶은 뱃지는 어떻게 해야할까요?" key="6">
              <p>
                내 Profile에 있는 Badge를 되팔고 싶을 때는 해당 Badge의 상세
                페이지로 들어가면 '판매하기' 버튼이 있어요. 원하는 가격을
                설정하시고 판매하시면 됩니다.
              </p>
            </Panel>
            <Panel header="아티스트가 되고싶어요. 방법을 알려주세요." key="7">
              <p>
                아티스트이신가요?{" "}
                <a href="https://forms.gle/KJUHZF2AWpHVT1z29" target="_blank">
                  여기
                </a>
                를 눌러 아티스트 신청서를 제출해주세요. 관리자 검토 후 2~3일
                이내(공휴일 제외)에 신청 결과를 메일로 알려드립니다.
              </p>
            </Panel>
          </Collapse>
        </div>
      </AboutExplainDiv>
    </AboutMainDiv>
  );
};
