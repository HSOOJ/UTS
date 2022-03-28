import FontSize from "../../../foundation/font/size/FontSize";
import { Icon } from "../../../foundation/Icon/Icon";
import { InputBox, InputBoxVariants, Label, TextField } from "./Input.styled";
import { IInput } from "./Input.types";

const Input = ({
  hasError,
  label,
  isDark,
  placeholder,
  type,
  disabled,
}: IInput) => {
  return (
    <>
      {label ? (
        <Label disabled={disabled} isDark={isDark}>
          {label}
        </Label>
      ) : null}
      <InputBox
        hasError={hasError}
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
          variants={InputBoxVariants}
          whileFocus="focus"
          whileHover="focus"
          isDark={isDark}
          type={type}
          placeholder={placeholder}
        />
      </InputBox>
    </>
  );
};

export default Input;
