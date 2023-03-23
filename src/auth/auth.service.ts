import { Injectable, Logger } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { admin, kakaoUser } from "src/models";

@Injectable()
export class AuthService {
  constructor(private readonly seqeulize: Sequelize) {}

  async tokenValidate(payload) {
    const t = await this.seqeulize.transaction();
    try {
      const findId = await admin.findOne({
        where: {
          adminId: payload.adminId,
        },
      });
      await t.commit();
      return findId;
    } catch (error) {
      Logger.error(error);
      await t.rollback();
    }
  }

  async kakaoValidate(payload) {
    const t = await this.seqeulize.transaction();
    try {
      const findId = await kakaoUser.findOne({
        where: {
          kakaoId: payload.kakaoId.toString(),
        },
      });
      await t.commit();
      return findId;
    } catch (error) {
      Logger.error(error);
      await t.rollback();
    }
  }
}
