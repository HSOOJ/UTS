import styled from "styled-components";
import UtsRouter from "./routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./global/style";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/theme";
import { ThemeType } from "./global/theme";
import Palette from "./foundation/color/Palette";

import { useEffect } from "react";
import { userState } from "./recoil/user";
import { profileState } from "./recoil/profile";
import axios from "axios";

const UtsContainer = styled.div<ThemeType>`
  color: ${(props) => (props.isDark ? Palette.Grigio200 : Palette.Nero300)};
  background-color: ${(props) =>
    props.isDark ? Palette.Nero300 : Palette.grigio200};
  min-height: 100vh;
`;

function App() {
  // recoil
  const theme = useRecoilValue(themeAtom);
  const [userStateVal, setUserStateVal] = useRecoilState(userState);
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // Axios
  const CheckRole = (walletAddress: string | undefined) => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/user/join",
      data: {
        userWalletAddress: walletAddress,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setProfileStateVal({
          ...profileStateVal,
          userRole: res.data.success.userRole,
        });
        setUserStateVal({ ...userStateVal, login: true });
      })
      .catch((res) => {
        console.log(res);
        console.log("!isLogin");
        setUserStateVal({ ...userStateVal, login: false });
      });
  };

  // useEffect
  useEffect(() => {
    if (
      profileStateVal.userSeq === undefined ||
      profileStateVal.userSeq === null
    ) {
      setUserStateVal({ ...userStateVal, login: false });
    } else {
      CheckRole(localStorage.getItem("userAccount")?.replace(/\"/gi, ""));
    }
  }, []);

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
