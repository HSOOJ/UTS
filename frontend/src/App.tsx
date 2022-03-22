import styled from "styled-components";
import UstRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import "antd/dist/antd.css";

const UstContainer = styled.div``;

function App() {
  return (
    <UstContainer>
      <GlobalStyle />
      <UstRouter />
      <ReactQueryDevtools />
    </UstContainer>
  );
}

export default App;
