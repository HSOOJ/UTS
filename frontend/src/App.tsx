import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/theme";
import { useEffect } from "react";
import { userState } from "./recoil/user";

const UtsContainer = styled.div``;

function App() {
  // recoil
  const theme = useRecoilValue(themeAtom);
  const [userStateVal, setUserStateVal] = useRecoilState(userState);

  // useEffect
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      setUserStateVal({ ...userStateVal, login: false });
    } else {
      setUserStateVal({ ...userStateVal, login: true });
    }
  }, []);

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
