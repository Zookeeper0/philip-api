import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";
import { Utils } from "src/util/common.utils";
import { Logger } from "@nestjs/common/services";
import { post } from "src/models";

@Injectable()
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findById(kakaoId: string) {
    return await this.sequelize.query(
      `
        SELECT
          k.kakao_id
        FROM
          kakao_user AS k
          WHERE k.kakao_id = '${kakaoId}';
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }
}
