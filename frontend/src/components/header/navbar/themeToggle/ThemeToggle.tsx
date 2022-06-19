import { useRecoilState } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
import { Toggle } from "./ThemeToggle.styled";

export const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  return (
    <Toggle
      onClick={() => {
        console.log("clicked!");
        setTheme((now) => {
          return { isDark: !now.isDark };
        });
      }}
    >
      {theme.isDark ? (
        <img src="img/달.png"></img>
      ) : (
        <img src="img/해.png"></img>
      )}
    </Toggle>
  );
};
