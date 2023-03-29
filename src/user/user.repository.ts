import { Injectable } from "@nestjs/common";
import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}

  /** 카카오아이디 유저 디비에 있는지 검증 */
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

  async getKakaoUsers() {
    return await this.sequelize.query(
      `
        SELECT
          k.kakao_id
        FROM
          kakao_user AS k
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }
}
