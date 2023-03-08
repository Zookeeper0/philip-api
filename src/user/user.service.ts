import { Injectable, UnauthorizedException } from "@nestjs/common";
import { v1 as uuid } from "uuid";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";

import { createAccessToken } from "src/common/jwt.fn";

@Injectable()
export class UserService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  // 유저 로그인
  // createAdmindto( adminId, password )
  async kakaoLogin(code: string): Promise<{ accessToken: string }> {
    return;
  }
}
