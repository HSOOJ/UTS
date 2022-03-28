import { Edition } from "@models/edition-model";
import { Nft } from "@models/nft-model";
import { getConnection } from "typeorm";

function mintingcheck() {
  const connection = getConnection();
  const nftRepository = connection.getRepository(Nft);

  return 1;
}

function mintingNft(
  editionSeq: number,
  editionName: string,
  editionImage: string,
  editionDescription: string,
  editionRoyalty: number
) {
  const connection = getConnection();
  const nftRepository = connection.getRepository(Nft);
  const editionRepository = connection.getRepository(Edition);
  const nowDate = new Date();

  const newEdition = editionRepository.insert({
    edition_seq: editionSeq,
    // artist_seq: artistSeq,
    edition_name: editionName,
    edition_image: editionImage,
    edition_description: editionDescription,
    edition_royalty: editionRoyalty,
    reg_dt: nowDate,
  });
  return 1;
}
export default { mintingcheck, mintingNft } as const;
