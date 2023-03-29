import { Injectable } from "@nestjs/common";
import { Request } from "express";
import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";

@Injectable()
export class AdminRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}

  async getAdminList(req: Request) {
    const { search } = req.query;
    console.log(search);
    const whereArr = [["AND a.name LIKE :search", search]];
    return await this.sequelize.query(
      `
        SELECT
          a.oid,
          a.admin_id,
          a.name,
          a.role
        FROM
          admin AS a
          WHERE TRUE
          ${this.util.likeGenerator(whereArr, req.query)}
      `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: req.query,
      }
    );
  }
}
