import FontSize from "../../../foundation/font/size/FontSize";
import { Icon } from "../../../foundation/Icon/Icon";
import { LayOut, LayOutVariants } from "./Badge.styled";
import { IBadge } from "./Badge.types";

export const Badge = ({ liked, type, borderColor, isDark }: IBadge) => {
  return (
    <LayOut
      whileHover="hover"
      variants={LayOutVariants}
      type={type}
      borderColor={borderColor}
    >
      {type === "like" &&
        (liked ? (
          <Icon name="heart-solid" size={FontSize["h3"]} color={"danger"} />
        ) : (
          <Icon
            name="heart"
            size={FontSize["h3"]}
            color={isDark ? "dark" : "light"}
          />
        ))}
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
