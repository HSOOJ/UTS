import icon from "./assets";
import Svg from "./Icon.styled";
import IIcon from "./Icon.types";

export const Icon = ({ name, color, size = 32 }: IIcon) => (
  <Svg as={icon[name]} name={name} color={color} width={size} height={size} />
);
