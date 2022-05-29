import { IReactNode } from "../../../../../types/IReactNode";
import { Image } from "../../../../containers/Image";
import { IImage } from "../../../../containers/Image/Image.types";
import { BgImageLayOut } from "./ArtistItem.styled";

export const BackgroundImage = ({ src, children }: IImage & IReactNode) => {
  return (
    <BgImageLayOut>
      <Image width="100%" height="120px" src={src}></Image>
      {children}
    </BgImageLayOut>
  );
};
