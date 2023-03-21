import { Injectable } from "@nestjs/common";
import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findById(kakaoId: string) {
    console.log("access_token", kakaoId);
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
