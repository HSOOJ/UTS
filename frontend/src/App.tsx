import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/theme";

const UstContainer = styled.div``;

function App() {
  const theme = useRecoilValue(themeAtom);

  return (
    <UstContainer>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UtsRouter />
      </ThemeProvider>
      <ReactQueryDevtools />
    </UstContainer>
  );
}

export default App;
