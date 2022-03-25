import { useParams, Params } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef } from "react";
import { Modal, Button } from "antd";

interface ArtistParamTypes extends Params {
  artist_id: string;
}

export const ArtistInfo = () => {
  // 현재 artist_id 잡아내기
  const { artist_id } = useParams() as ArtistParamTypes;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const UserImg = styled.img`
    border-radius: 50%;
  `;

  function success() {
    Modal.success({
      content: "0x040192238F80F90c0004dC33e0dd54909777721D",
    });
  }

  return (
    <div>
      <h1>ArtistDetail</h1>
      <UserImg src="https://picsum.photos/250/250"></UserImg>
      <p>{artist_id}번째 아티스트</p>
      <h1>현정이</h1>
      <Button onClick={success} type="primary">
        지갑 주소 확인하기
      </Button>
      <hr />
      <div>
        <p>아티스트 여러줄 소개 블라블라</p>
        <p>카테고리</p>
        <p>소셜 링크</p>
        <p>팔로워 수</p>
        <p>총 매출</p>
        <p>최고가</p>
        <p>거래량</p>
      </div>
      <hr />
      <p>BADGE EDITION</p>
      <div>
        <div>
          <UserImg src="https://picsum.photos/50/50" />
          <p>에디션 이름</p>
          <p>From 2ETH ~</p>
          <p>2022.03.09</p>
          <progress value="50" max="100" />
        </div>
        <div>
          <UserImg src="https://picsum.photos/50/50" />
          <p>에디션 이름</p>
          <p>From 2ETH ~</p>
          <p>2022.03.09</p>
          <progress value="50" max="100" />
        </div>{" "}
        <div>
          <UserImg src="https://picsum.photos/50/50" />
          <p>에디션 이름</p>
          <p>From 2ETH ~</p>
          <p>2022.03.09</p>
          <progress value="50" max="100" />
        </div>
        <p>...</p>
      </div>
    </div>
  );
};
