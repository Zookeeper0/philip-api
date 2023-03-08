import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { v1 as uuid } from "uuid";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";
import * as crypto from "crypto";
import { admin } from "src/models";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { createAccessToken } from "src/common/jwt.fn";
@Injectable()
export class AdminService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly util: Utils
  ) {}

  // 관리자 로그인
  // createAdmindto( adminId, password )
  async signInAdmin(
    signinAdmin: SignInAdminDto
  ): Promise<{ accessToken: string }> {
    try {
      const { adminId, password } = signinAdmin;
      const signinData = await admin.findOne({
        where: {
          adminId: adminId,
        },
      });
      if (
        signinData &&
        (await crypto.createHash("sha512").update(password).digest("hex"))
      ) {
        console.log("in");
        // 유저 토큰 생성 ( Secret + Payload )
        const payload = { adminId };
        const accessToken = await createAccessToken(payload);

        return { accessToken };
      }
    } catch (err) {
      throw new UnauthorizedException("logIn failed");
    }
  }

  // 관리자 생성
  // createAdmindto( oid?, adminId, password, name, birth)
  async createAdmin(createAdmindto: CreateAdminDto) {
    const t = await this.seqeulize.transaction();
    try {
      // duple check
      const adminData = await admin.findOne({
        where: {
          adminId: createAdmindto.adminId,
          password: crypto
            .createHash("sha512")
            .update(createAdmindto.password)
            .digest("hex"),
        },
      });

      // 위의 조건과 같은 조건이 있다면 중복된 아이디 알림
      if (adminData?.adminId) {
        console.log("중복된 아이디 입니다.");
        return { message: "중복된 아이디 입니다." };
      }

      createAdmindto.password = crypto
        .createHash("sha512")
        .update(createAdmindto.password)
        .digest("hex");

      // const USER_OID = await this.util.getOid(admin, "admin");
      const USER_OID = uuid();
      createAdmindto.oid = USER_OID;

      await admin.create(createAdmindto);
      await t.commit();
    } catch (err) {
      Logger.error(err);
      await t.rollback();
    }
  }
}
