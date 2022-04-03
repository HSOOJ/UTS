import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Palette from "../../../foundation/color/Palette";
import FontColor from "../../../foundation/font/color/FontColor";
import FontWeight from "../../../foundation/font/weight/FontWeight";
import Svg from "../../../foundation/Icon/Icon.styled";
import { ThemeType } from "../../../global/theme";
import { IDisable } from "../../../types/IDisabled";
import { FormType } from "../../../types/IForm";
import { IInput } from "./Input.types";

const bgColor = {
  light: Palette.Grigio100,
  dark: Palette.Grigio400,
};

const borderColor = {
  light: Palette.BluOpacity100,
  dark: Palette.Nero100,
};

const textColor = {
  light: Palette.Grigio400,
  dark: FontColor["light"],
};

export const InputBox = styled.label<IInput>`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${({ isDark }) => (isDark ? borderColor["dark"] : borderColor["light"])};
  background-color: ${({ isDark }) =>
    isDark ? bgColor["dark"] : bgColor["light"]};
  ${Svg} {
    position: absolute;
    margin-left: 12px;
  }

  ${({ disabled }) => disabled && disabledLayoutStyle}
  ${({ errMessage }) => errMessage && erroredLayoutStyle}
`;

export const TextField = styled(motion.input)<FormType & ThemeType>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  padding: 0px 12px;
  padding-left: ${({ type }) => type === "search" && "36px"};

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
    boxShadow: `0px 0px 12px ${Palette.Blu200}`,
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
  box-shadow: 0px 0px 8px ${Palette.Rosso100};
`;

export const LayOut = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`;

export const ErrorLayOut = styled(motion.div)`
  margin-top: 5px;
  align-self: flex-end;
  color: ${FontColor["danger"]};
`;

export const errVariants = {
  initial: { x: 30, opacity: 0.5 },
  entry: { x: -5, opacity: 1 },
  exit: {},
};
