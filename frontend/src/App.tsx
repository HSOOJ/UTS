import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import "antd/dist/antd.css";

const UstContainer = styled.div``;

function App() {
  return (
    <UstContainer>
      <GlobalStyle />
      <UtsRouter />
      <ReactQueryDevtools />
    </UstContainer>
  );
}

export default App;
