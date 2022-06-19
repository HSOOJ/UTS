import styled from "styled-components";

export const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 75px;
`;

export const UserBackgroundImg = styled.img`
  border-radius: 3%;
  filter: blur(2px);
  width: 700px;
  height: 250px;
`;

export const UserImg = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 100px;
  width: 200px;
  height: 200px;
`;

export const BadgeList = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 235px;
  right: 50px;
`;
