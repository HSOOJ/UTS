import styled from "styled-components";

const paddingAndGap = 15;
const defaultGridCardMaxWidth = 280;
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
  max-width: 1660px;
  height: 100%;

  @media screen and (max-width: ${large}px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: ${medium}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: ${small}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${xsmall}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
