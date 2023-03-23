import { Injectable, InternalServerErrorException } from "@nestjs/common";

import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";
import { CityDto } from "./dto/city.dto";

@Injectable()
export class CategoryRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly util: Utils
  ) {}

  /** GET 모든 카테고리 데이터 프론트 상단 nav 항목 */
  async getAllCategory() {
    return await this.sequelize.query(
      `
          SELECT * 
            FROM category
              ORDER BY
                CASE
                  WHEN name = '전체' then 0
                  WHEN name = 'KTV' then 1
                  WHEN name = 'JTV' then 2
                  WHEN name = 'BAR' then 3
                END;
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }

  /** GET 모든 City 카테고리 데이터 항목 */
  async getAllCity() {
    return await this.sequelize.query(
      `
          SELECT * 
            FROM city
              ORDER BY
                CASE
                  WHEN name = '마닐라' then 0
                  WHEN name = '앙헬레스' then 1
                  WHEN name = '세부' then 2
                END;
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }
}
