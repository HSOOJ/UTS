import styled from "styled-components";
import LetterBox from "../../../containers/letterBox/LetterBox";

export const Title = () => {
  return (
    <LayOut>
      <LetterBox size="h3" weight="extraBold">
        Generate Badge
      </LetterBox>
    </LayOut>
  );
};

export const LayOut = styled.div`
  margin: 20px 0px;
`;
