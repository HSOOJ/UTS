import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: left;
  justify-content: left;
  padding: 25px;
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30px;
`;
export const ContainerText = styled.div`
  padding: 15px 0 0 15px;
  display: block;
  text-align: left;
`;
export const TextEditionName = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;
export const TextArtistName = styled.p`
  font-size: 21px;
  color: white;
`;
export const TextNftNum = styled.p`
  font-size: 18px;
  color: white;
`;
export const ButtonLoad = styled.button`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 1px solid #a8c1f8;
  color: #fff;
  display: inline;
  font-size: 17px;
  font-weight: bold;
  padding: 15px 20px 15px 20px;
  margin: 15px 0 20px 0;
  position: relative;
  &:hover {
    color: #a8c1f8;
  }
`;
