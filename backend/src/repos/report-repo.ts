import { Report } from "@models/report-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Report)
export class reportRepository extends Repository<Report> {}
