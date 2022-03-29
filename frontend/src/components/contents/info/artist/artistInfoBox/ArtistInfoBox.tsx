import styled from "styled-components";

const InfoMainbox = styled.div`
  background-color: gray;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoDetailBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoMoreDetailBox = styled.div`
  text-align: center;
  width: 150px;
`;

export const ArtistInfoBox = () => {
  return (
    <InfoMainbox>
      <p>아티스트 여러줄 소개 블라블라</p>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>아트</InfoMoreDetailBox>
        <InfoMoreDetailBox>소셜 링크</InfoMoreDetailBox>
        <InfoMoreDetailBox>팔로워 수</InfoMoreDetailBox>
      </InfoDetailBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox>총 매출</InfoMoreDetailBox>
        <InfoMoreDetailBox>최고가</InfoMoreDetailBox>
        <InfoMoreDetailBox>거래량</InfoMoreDetailBox>
      </InfoDetailBox>
    </InfoMainbox>
  );
};
