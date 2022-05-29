import { CardLayOutVariants, LayOut } from "./Card.styled";
import { ICard } from "./Card.types";

export const Card = ({ isDark, children }: ICard) => {
  return (
    <LayOut
      key={"" + isDark}
      isDark={isDark}
      variants={CardLayOutVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </LayOut>
  );
};
