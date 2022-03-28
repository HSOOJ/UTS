import { shortenNumber } from "../../../../../utils/number";
import { shortenString } from "../../../../../utils/string";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { NameBoxLayOut } from "./ArtistItem.styled";

interface INameBox {
  name: string;
  followers: number;
}

export const Profile = ({ name, followers }: INameBox) => {
  return (
    <NameBoxLayOut>
      <LetterBox
        size={name.length >= 14 ? "body2" : name.length >= 9 ? "body1" : "h3"}
        weight="extraBold"
      >
        {shortenString(name, 19)}
      </LetterBox>
      <div>
        <LetterBox size="body1" weight="bold" color="primary">
          {shortenNumber(followers)}
        </LetterBox>
        <LetterBox size="body2" color="shade">
          {" 팔로워"}
        </LetterBox>
      </div>
    </NameBoxLayOut>
  );
};
