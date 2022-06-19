import { ThemeType } from "../../../../../global/theme";
import { shortenNumber } from "../../../../../utils/number";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { SalesItemBox, SalesLayOut } from "./ArtistItem.styled";

export interface ISales extends ThemeType {
  Volume: number;
  Highest: number;
  Txs: number;
}

export const Sales = ({ isDark, ...api }: ISales) => {
  return (
    <SalesLayOut>
      {Object.entries(api).map(([key, val]) => (
        <SalesItemBox key={key} isDark={isDark}>
          <LetterBox weight="bold" color="shade">
            {key}
          </LetterBox>
          <LetterBox size="body2" color="primary" weight="extraBold">
            {shortenNumber(val)}
          </LetterBox>
        </SalesItemBox>
      ))}
    </SalesLayOut>
  );
};
