import { Injectable, Logger } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { admin } from "src/models";
import { TokenService } from "src/token/token.service";

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
    } catch (err) {
      Logger.error(err);
      await t.rollback();
    }
  }
}
