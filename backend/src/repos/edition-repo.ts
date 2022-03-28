import { Edition } from "@models/edition-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Edition)
export class editionRepository extends Repository<Edition> {}
