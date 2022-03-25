import { LayOut } from "./Card.styled";
import { ICard } from "./Card.types";

export const Card = ({ isDark }: ICard) => {
  return <LayOut isDark={isDark}></LayOut>;
};
