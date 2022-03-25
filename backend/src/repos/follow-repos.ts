import { Follow } from "@models/follow-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Follow)
export class followRepository extends Repository<Follow> {}
