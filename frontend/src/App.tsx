import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/theme";
import { ThemeType } from "./global/theme";
import Palette from "./foundation/color/Palette";

const UtsContainer = styled.div<ThemeType>`
  color: ${(props) => (props.isDark ? Palette.Grigio200 : Palette.Nero300)};
  background-color: ${(props) =>
    props.isDark ? Palette.Nero300 : Palette.grigio200};
`;

function App() {
  const theme = useRecoilValue(themeAtom);

  return (
    <UtsContainer isDark={theme.isDark}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UtsRouter />
      </ThemeProvider>
      <ReactQueryDevtools />
    </UtsContainer>
  );
}

export default App;
