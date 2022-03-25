import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../../recoil/theme";
import { IReactNode } from "../../../../../types/IReactNode";
import Card from "../../../../containers/card";
import LetterBox from "../../../../containers/letterBox/LetterBox";

export const ArtistItem = ({ children }: IReactNode) => {
  const isDark = useRecoilValue(themeAtom).isDark;

  return (
    <Card isDark={isDark}>
      <LetterBox size="h1">{children}</LetterBox>
    </Card>
  );
};
