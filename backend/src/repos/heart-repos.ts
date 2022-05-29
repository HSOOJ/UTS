import { Heart } from "@models/heart-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Heart)
export class heartRepository extends Repository<Heart> {}
