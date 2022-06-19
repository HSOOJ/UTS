import { ThemeType } from "../../../../../global/theme";
import { camelToTitle, shortenString } from "../../../../../utils/string";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  TokenItemBox,
  TokenLayOut,
  TokenItemLayOut,
} from "./ArtistItem.styled";
import { ArtistItemBadgeType } from "./ArtistItem.types";
import { TokenImage } from "./TokenImage";

export interface IToken extends ThemeType {
  bestSellers: ArtistItemBadgeType;
  newestDrops: ArtistItemBadgeType;
}

export const Token = ({ isDark, ...api }: IToken) => {
  return (
    <TokenLayOut>
      {Object.entries(api).map(([key, val]) => (
        <TokenItemLayOut key={val}>
          <LetterBox weight="bold" color={isDark ? "primary" : "shade"}>
            {camelToTitle(key)}
          </LetterBox>
          <TokenItemBox isDark={isDark}>
            <TokenImage isDark={isDark} src={val.tokenSrc} />
            <LetterBox size="body2" color={"shade"}>
              {val.tokenName && shortenString(val.tokenName, 15)}
            </LetterBox>
            <LetterBox size="body2" color={isDark ? "light" : "dark"}>
              {val.price} ETH
            </LetterBox>
          </TokenItemBox>
        </TokenItemLayOut>
      ))}
    </TokenLayOut>
  );
};
