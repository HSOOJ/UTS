import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/theme";

const UtsContainer = styled.div``;

function App() {
  const theme = useRecoilValue(themeAtom);

  return (
    <UtsContainer>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UtsRouter />
      </ThemeProvider>
      <ReactQueryDevtools />
    </UtsContainer>
  );
}

export default App;
