import { Edition } from "@models/edition-model";
import { getConnection } from "typeorm";

async function getEditionInfo(editionSeq: number) {
  const editionRepository = getConnection().getRepository(Edition);
  return editionRepository.findOne({
    where: {
      edition_seq: editionSeq,
    },
  });
}

async function returnEditionImage(editionSeq: number) {
  const res = await getConnection()
    .createQueryBuilder()
    .select("edition.edition_image")
    .from(Edition, "edition")
    .where("edition.edition_seq = :eSeq", { eSeq: editionSeq })
    .getOne();

  const img = (<{ edition_image: string }>res).edition_image;
  return img;
}

export default {
  getEditionInfo,
  returnEditionImage,
} as const;
