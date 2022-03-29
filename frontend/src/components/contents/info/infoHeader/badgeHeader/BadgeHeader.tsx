import styled from "styled-components";
import Badge from "../../../../containers/badge";

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 75px;
`;
const UserBackgroundImg = styled.img`
  border-radius: 3%;
  filter: blur(2px);
  width: 700px;
  height: 250px;
`;

const UserImg = styled.img`
  border-radius: 50%;
  border: solid white;
  position: absolute;
  top: 100px;
  width: 200px;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 235px;
  right: 50px;
`;

export const BadgeHeader = () => {
  return (
    <ImgDiv>
      <UserBackgroundImg src="https://picsum.photos/250/250"></UserBackgroundImg>
      <UserImg src="https://picsum.photos/250/250"></UserImg>
      <BadgeList>
        <Badge type="like"></Badge>
      </BadgeList>
    </ImgDiv>
  );
};
