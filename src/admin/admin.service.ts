import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { v1 as uuid } from "uuid";
import { Logger } from "@nestjs/common/services";
import { Sequelize } from "sequelize-typescript";
import { Utils } from "src/util/common.utils";
import * as crypto from "crypto";
import { admin } from "src/models";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { createAccessToken, getTokenInfo } from "src/common/jwt.fn";
import { AdminRepository } from "./admin.repository";

@Injectable()
export class AdminService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly adminRepository: AdminRepository
  ) {}

  /** 관리자 로그인 */
  // createAdmindto( adminId, password )
  async signInAdmin(signinAdmin: SignInAdminDto) {
    try {
      console.log(signinAdmin);
      const { adminId, password } = signinAdmin;
      const signinData = await admin.findOne({
        where: {
          adminId: adminId,
        },
      });

      // 이메일 존재시 비밀번호 비교.
      if (
        signinData.password.toString() !==
        crypto.createHash("sha512").update(password).digest("hex")
      ) {
        console.log("signinData.password :", signinData.password);
        throw new NotFoundException("비밀번호가 일치하지 않습니다.");
      }

      const { oid } = signinData;
      const payload = { oid, adminId };
      // 유저 토큰 생성
      const accessToken = await getTokenInfo(payload);
      return accessToken;
    } catch (error) {
      console.log(error);
      Logger.error(error);
      throw new UnauthorizedException("유저 정보를 찾을 수 없습니다.");
    }
  }

  /** 관리자 생성  */
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
        throw new NotAcceptableException();
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
    } catch (error) {
      Logger.error(error);
      await t.rollback();
    }
  }
}
