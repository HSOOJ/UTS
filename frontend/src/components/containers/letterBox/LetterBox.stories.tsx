import styled from "styled-components";
import { Meta } from "@storybook/react";

import LetterBox from "./LetterBox";

import FontSize, { FontSizeKeys } from "../../../foundation/font/size/FontSize";
import { FontWeightKeys } from "../../../foundation/font/weight/FontWeight";
import FontColor, {
  FontColorKeys,
} from "../../../foundation/font/color/FontColor";

const meta: Meta = {
  title: "Containers/LetterBox",
  component: LetterBox,
};

export const SizeAndWeight = () => {
  return FontSizeKeys.map((fontSize) =>
    FontWeightKeys.map((fontWeight) => (
      <LayOut>
        <Row style={{ width: "50px" }}>
          <LetterBox size={fontSize} weight={fontWeight} color="dark">
            {fontSize}
          </LetterBox>
        </Row>
        <Row style={{ width: "50px" }}>
          <LetterBox size={fontSize} weight={fontWeight} color="dark">
            {FontSize[fontSize]}
          </LetterBox>
        </Row>
        <Row style={{ width: "120px" }}>
          <LetterBox size={fontSize} weight={fontWeight} color="dark">
            {fontWeight}
          </LetterBox>
        </Row>
        <Row>
          <LetterBox size={fontSize} weight={fontWeight} color="dark">
            Dive into the sea of 아티스트
          </LetterBox>
        </Row>
      </LayOut>
    ))
  );
};

export const WeightAndColor = () => {
  return FontColorKeys.map((fontColor) =>
    FontWeightKeys.map((fontWeight) => (
      <LayOut>
        <Row style={{ width: "60px" }}>
          <LetterBox size="h3" weight={fontWeight} color={fontColor}>
            {fontColor}
          </LetterBox>
        </Row>
        <Row style={{ width: "80px" }}>
          <LetterBox size="h3" weight={fontWeight} color={fontColor}>
            {FontColor[fontColor]}
          </LetterBox>
        </Row>
        <Row style={{ width: "100px" }}>
          <LetterBox size="h3" weight={fontWeight} color={fontColor}>
            {fontColor}
          </LetterBox>
        </Row>
        <Row>
          <LetterBox size="h3" weight={fontWeight} color={fontColor}>
            Dive into the sea of 아티스트
          </LetterBox>
        </Row>
      </LayOut>
    ))
  );
};

export default meta;

const LayOut = styled.div`
  display: flex;
  align-items: center;
`;

const Row = styled.div``;
