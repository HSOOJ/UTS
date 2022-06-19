import { LayOut } from "./Image.styled";
import { IImage } from "./Image.types";

const Image = ({
  blurDeg = 0,
  shape = "box",
  width,
  height,
  src,
  borderSize,
  borderColor,
}: IImage) => {
  return (
    <LayOut
      borderColor={borderColor}
      borderSize={borderSize}
      blurDeg={blurDeg}
      width={width}
      height={height}
      shape={shape}
      src={src}
    ></LayOut>
  );
};

export default Image;
