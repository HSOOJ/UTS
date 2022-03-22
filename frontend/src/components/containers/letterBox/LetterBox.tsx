import { LetterBoxStyle as LetterBoxView } from "./LetterBox.styled";
import ILetterBox from "./LetterBox.types";

export const LetterBox = ({ weight, size, color, children }: ILetterBox) => {
  return (
    <LetterBoxView weight={weight} size={size} color={color}>
      {children}
    </LetterBoxView>
  );
};

export default LetterBox;
