import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Palette from "../../../foundation/color/Palette";
import FontColor from "../../../foundation/font/color/FontColor";
import FontWeight from "../../../foundation/font/weight/FontWeight";
import { Icon } from "../../../foundation/Icon/Icon";
import Svg from "../../../foundation/Icon/Icon.styled";
import { ThemeType } from "../../../global/theme";
import { IDisable } from "../../../types/IDisabled";
import { IInput } from "./Input.types";

const bgColor = {
  light: Palette.Grigio100,
  dark: Palette.Grigio500,
};

const textColor = {
  light: FontColor["dark"],
  dark: FontColor["light"],
};

export const InputBox = styled.label<IInput>`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 36px;
  width: 100%;
  border: 0px;
  border-radius: 8px;
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark"] : bgColor["light"]};
  ${Svg} {
    margin-left: 12px;
  }

  ${({ disabled }) => disabled && disabledLayoutStyle}
  ${({ hasError }) => hasError && erroredLayoutStyle}
`;

export const TextField = styled(motion.input)<IInput>`
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 8px;
  border: none;
  padding: 0px 12px;

  color: ${({ isDark }) => (isDark ? textColor["dark"] : textColor["light"])};

  background-color: transparent;

  ::placeholder {
    color: ${FontColor["shade"]};
  }

  :focus {
    outline: none;
  }
`;

export const Label = styled.span<IDisable & ThemeType>`
  display: inline-block;
  margin-left: 4px;
  margin-bottom: 8px;
  font-weight: ${FontWeight["bold"]};
  color: ${({ isDark }) =>
    isDark ? FontColor["light"] : FontColor["primary"]};

  ${({ disabled }) => disabled && disabledLabelStyle}
`;

export const InputBoxVariants = {
  focus: {
    border: `1px solid ${Palette.Blu100}`,
    boxShadow: `0px 0px 12px ${Palette.BluOpacity100}`,
  },
};

const disabledLayoutStyle = css`
  border: 1px solid ${Palette.Grigio200};
  background-color: ${Palette.Grigio200};
  pointer-events: none;
`;

const disabledLabelStyle = css`
  color: ${FontColor["shade"]};
`;

const erroredLayoutStyle = css`
  /* border: 1px solid ${Palette.Rosso100}; */
  box-shadow: 0px 0px 8px ${Palette.Rosso100};
`;
