import { Sale } from "@models/sale-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Sale)
export class saleRepository extends Repository<Sale> {}
