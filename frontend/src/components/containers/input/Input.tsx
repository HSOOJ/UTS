import FontSize from "../../../foundation/font/size/FontSize";
import { Icon } from "../../../foundation/Icon/Icon";
import LetterBox from "../letterBox/LetterBox";
import {
  InputBox,
  InputBoxVariants,
  Label,
  TextField,
  LayOut,
  ErrorLayOut,
  errVariants,
} from "./Input.styled";
import { IInput } from "./Input.types";
const Input = ({
  label,
  isDark,
  placeholder,
  type,
  disabled,
  errMessage,
  register,
}: IInput) => {
  return (
    <LayOut>
      {label ? (
        <Label disabled={disabled} isDark={isDark}>
          {label}
        </Label>
      ) : null}
      <InputBox
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
          errMessage={errMessage}
          variants={InputBoxVariants}
          whileFocus="focus"
          whileHover="focus"
          isDark={isDark}
          type={type}
          placeholder={placeholder}
        />
      </InputBox>
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

export default Input;
