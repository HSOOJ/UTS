import { GridLayOut } from "./Artist.styled";
import ArtistItem from "./artistItem";

export const Artist = () => {
  return (
    <GridLayOut>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => (
        <ArtistItem>holy shit</ArtistItem>
      ))}
    </GridLayOut>
  );
};

export default Artist;
