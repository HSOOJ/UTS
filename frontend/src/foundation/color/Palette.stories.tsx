import { Meta } from "@storybook/react";
import styled from "styled-components";
import LetterBox from "../../components/containers/letterBox/LetterBox";
import Palette from "./Palette";
import IPalette from "./Palette.types";

const meta: Meta = {
  title: "Foundation/Colors",
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

const PaletteKeys = Object.keys(Palette);
export const PaletteTemplate = () => {
  return (
    <LayOut>
      {PaletteKeys.map((color) => (
        <ColorChip key={color}>
          <ColorTile color={Palette[color]} />
          <LetterBox size="h3" weight="extraBold" color="dark">
            {color}
          </LetterBox>
          <LetterBox size="body2" weight="regular" color="shade">
            {Palette[color]}
          </LetterBox>
        </ColorChip>
      ))}
    </LayOut>
  );
};

PaletteTemplate.storyName = "Palette";

export default meta;

const LayOut = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorChip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 120px;
  margin: 10px;
`;

const ColorTile = styled.div<IPalette>`
  width: 80px;
  height: 80px;
  margin-bottom: 4px;
  border-radius: 12px;
  background-color: ${({ color }) => color};
`;
