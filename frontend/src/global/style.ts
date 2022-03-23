import { createGlobalStyle } from "styled-components";
import {
  UstFontBold,
  UstFontExtraBold,
  UstFontLight,
  UstFontRegular,
} from "./fonts";
import initialize from "./initialize";

export const GlobalStyle = createGlobalStyle`
  ${initialize}

  // Fonts
  ${UstFontLight}
  ${UstFontRegular} 
  ${UstFontBold}
  ${UstFontExtraBold}

  body {
    font-weight: 400;
    font-family: 'Leferi', sans-serif;
  }
`;
