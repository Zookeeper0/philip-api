import { Injectable, InternalServerErrorException } from "@nestjs/common";

import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";

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
              order by
                case
                  when name = '전체' then 0
                  when name = 'KTV' then 1
                  when name = 'JTV' then 2
                  when name = 'BAR' then 3  
                end;
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }
}
