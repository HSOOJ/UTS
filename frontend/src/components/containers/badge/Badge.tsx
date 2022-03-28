import FontSize from "../../../foundation/font/size/FontSize";
import { Icon } from "../../../foundation/Icon/Icon";
import { LayOut } from "./Badge.styled";
import { IBadge } from "./Badge.types";

export const Badge = ({ type, borderColor, isDark }: IBadge) => {
  return (
    <LayOut type={type} borderColor={borderColor}>
      {type === "like" && (
        <Icon
          name="heart"
          size={FontSize["h3"]}
          color={isDark ? "dark" : "light"}
        />
      )}
      {type === "report" && (
        <Icon
          name="exclamation"
          size={FontSize["h3"]}
          color={isDark ? "dark" : "light"}
        />
      )}
      {type === "verified" && (
        <Icon
          name="check"
          size={FontSize["h3"]}
          color={isDark ? "dark" : "light"}
        />
      )}
    </LayOut>
  );
};
