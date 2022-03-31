import { useState } from "react";
import { toggle } from "../../../utils/toggler";
import {
  LayOut,
  LayOutVariants,
  Toggle,
  ToggleVariants,
} from "./Switch.styled";
import { ISwitch } from "./Switch.types";

export const Switch = ({ onToggle, isChecked = false, isDark }: ISwitch) => {
  const [isOn, setIsOn] = useState(isChecked);

  return (
    <LayOut
      key={isDark + ""}
      onClick={() => {
        toggle(setIsOn);
        onToggle && toggle(onToggle);
      }}
      variants={LayOutVariants}
      animate={isOn ? "clicked" : "default"}
      isDark={isDark}
    >
      <Toggle
        variants={ToggleVariants}
        transition={{ type: "tween" }}
        initial="default"
        animate={isOn ? "clicked" : "default"}
      />
    </LayOut>
  );
};
