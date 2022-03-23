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
      {theme.isDark ? "다크모드" : "라이트모드"}
    </Toggle>
  );
};
