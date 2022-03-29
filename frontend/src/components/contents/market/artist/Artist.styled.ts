import styled from "styled-components";

const paddingAndGap = 15;
const defaultGridCardMaxWidth = 320;
const ControllerMaxWidth = 270;

const large =
  defaultGridCardMaxWidth * 5 + paddingAndGap * 4 + ControllerMaxWidth;

const medium =
  defaultGridCardMaxWidth * 4 + paddingAndGap * 3 + ControllerMaxWidth;

const small =
  defaultGridCardMaxWidth * 3 + paddingAndGap * 2 + ControllerMaxWidth;

const xsmall =
  defaultGridCardMaxWidth * 2 + paddingAndGap * 1 + ControllerMaxWidth;

export const GridLayOut = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${paddingAndGap}px;
  width: 100%;
  max-width: ${defaultGridCardMaxWidth * 5 + 60}px;
  height: 100%;

  @media screen and (max-width: ${large}px) {
    max-width: ${defaultGridCardMaxWidth * 4 + 60}px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: ${medium}px) {
    max-width: ${defaultGridCardMaxWidth * 3 + 50}px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: ${small}px) {
    max-width: ${defaultGridCardMaxWidth * 2 + 40}px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${xsmall}px) {
    max-width: ${defaultGridCardMaxWidth + 30}px;
    grid-template-columns: repeat(1, 1fr);
  }
`;
