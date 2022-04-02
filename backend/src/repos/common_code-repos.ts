import { Common_code } from "@models/common_code-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Common_code)
export class Common_codeRepository extends Repository<Common_code> {}
