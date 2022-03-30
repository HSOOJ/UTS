import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  text-align: center;
`;
export const ProfileContainerModify = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px 0;
`;
export const ProfileContainerInfo = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px 0 25px 0;
`;
export const ImageContainer = styled.div`
  margin: 0 16px;
  padding: 1em;
`;
export const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;
export const TextMain = styled.p`
  font-size: 40px;
  background: linear-gradient(to right, #e4f88b, #84e2d8);
  color: transparent;
  -webkit-background-clip: text;
`;
export const ButtonModify = styled.button`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 2px solid #b2e58b;
  border-radius: 25px;
  color: #fff;
  display: inline;
  font-size: 13px;
  font-weight: bold;
  padding: 15px;
  margin: 5px;
  position: relative;
  &:hover {
    color: #b2e58b;
  }
`;
export const ButtonSelect = styled.button<{ isSelected: boolean }>`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 3px solid #58d1c9;
  border-radius: 5px;
  color: ${(props) => (props.isSelected ? "#58d1c9" : "#fff")};
  display: inline;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 70px 15px 70px;
  margin: 0 10px 0 10px;
  position: relative;
  &:hover {
    color: #58d1c9;
  }
`;
