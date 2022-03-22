import { useParams, Params } from "react-router-dom";
import styled from "styled-components";

interface EditionParamTypes extends Params {
  edition_id: string;
}

export const EditionInfo = () => {
  // 현재 edition_id 잡아내기
  const { edition_id } = useParams() as EditionParamTypes;

  const UserImg = styled.img`
    border-radius: 50%;
  `;

  const EditionImg = styled.img`
    border-radius: 50%;
  `;

  const OwnerImg = styled.img`
    border-radius: 50%;
  `;

  return (
    <div>
      <p>{edition_id}번째 에디션</p>
      <UserImg src="https://picsum.photos/250/250" />
      <div>
        <EditionImg src="https://picsum.photos/150/150" />
        <p>존 메이어 골드 에디션</p>
        <p>에디션 혜택 설명</p>
      </div>
      <p>Badges on Market</p>
      <div>
        <EditionImg src="https://picsum.photos/100/100" />
        <p>#1</p>
        <p>1000SSF</p>
        <p>owner 정보</p>
        <OwnerImg src="https://picsum.photos/30/30" />

        {/* if문 걸어서 뱃지 주인이 아닐 때 */}
        <button>Buy</button>
        <button>☆</button>

        {/* if문 걸어서 뱃지 주인일 때 */}
        <button>Put on sale</button>
        <button>share</button>
      </div>
    </div>
  );
};
