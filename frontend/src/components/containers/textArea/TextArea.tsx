import FontSize from "../../../foundation/font/size/FontSize";
import { Icon } from "../../../foundation/Icon/Icon";
import { ErrorLayOut, errVariants } from "../input/Input.styled";
import LetterBox from "../letterBox/LetterBox";
import {
  TextAreaBox,
  InputBoxVariants,
  Label,
  TextField,
  LayOut,
} from "./TextArea.styled";
import { ITextArea } from "./TextArea.types";

const TextArea = ({
  label,
  isDark,
  placeholder,
  type,
  disabled,
  errMessage,
  register,
}: ITextArea) => {
  return (
    <LayOut>
      {label ? (
        <Label disabled={disabled} isDark={isDark}>
          {label}
        </Label>
      ) : null}
      <TextAreaBox
        errMessage={errMessage}
        type={type}
        isDark={isDark}
        disabled={disabled}
      >
        {type === "search" ? (
          <Icon
            size={FontSize.body1}
            color={isDark ? "light" : "primary"}
            name="search-glass"
          />
        ) : null}
        <TextField
          {...register}
          variants={InputBoxVariants}
          whileFocus="focus"
          whileHover="focus"
          isDark={isDark}
          type={type}
          placeholder={placeholder}
        />
      </TextAreaBox>
      {errMessage && (
        <ErrorLayOut
          key={errMessage}
          variants={errVariants}
          initial="initial"
          animate="entry"
          exit="exit"
        >
          <LetterBox size="body2">{errMessage}</LetterBox>
        </ErrorLayOut>
      )}
    </LayOut>
  );
};

export default TextArea;
