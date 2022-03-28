import styled from "styled-components";

const InfoMainbox = styled.div``;

const InfoDetailBox = styled.div`
  display: flex;
`;

export const ArtistInfoBox = () => {
  return (
    <InfoMainbox>
      <p>아티스트 여러줄 소개 블라블라</p>
      <br></br>
      <InfoDetailBox>
        <div>아트아트아트아트아트아트아트</div>
        <div>소셜 링크</div>
        <div>팔로워 수</div>
      </InfoDetailBox>
      <br></br>
      <InfoDetailBox>
        <p>총 매출</p>
        <p>최고가</p>
        <p>거래량</p>
      </InfoDetailBox>
    </InfoMainbox>
  );
};
