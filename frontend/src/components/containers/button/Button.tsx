import {
  ButtonLayOutVariantPrimary,
  ButtonLayOutVariantSecondary,
  LayOut,
} from "./Button.styled";
import { IButton } from "./Button.types";

export const Button = ({
  onClick,
  styleVariant = "primary",
  children,
}: IButton) => {
  return (
    <LayOut
      key={styleVariant}
      onClick={onClick}
      variants={
        styleVariant === "primary"
          ? ButtonLayOutVariantPrimary
          : ButtonLayOutVariantSecondary
      }
      styleVariant={styleVariant}
      whileHover="hover"
      exit="exit"
    >
      {children}
    </LayOut>
  );
};
