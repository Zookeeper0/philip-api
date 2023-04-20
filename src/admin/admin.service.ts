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
import { admin, files } from "src/models";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { createAccessToken, getTokenInfo } from "src/common/jwt.fn";
import { AdminRepository } from "./admin.repository";
import { InternalServerErrorException } from "@nestjs/common/exceptions";

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
      const { adminId, password } = signinAdmin;
      const signinData = await admin.findOne({
        where: {
          adminId: adminId,
        },
      });

      if (signinData === null) {
        throw new NotFoundException("존재하지 않는 사용자입니다.");
      }

      // 이메일 존재시 비밀번호 비교.
      if (
        signinData.password.toString() !==
        crypto.createHash("sha512").update(password).digest("hex")
      ) {
        throw new NotFoundException("비밀번호가 일치하지 않습니다.");
      }

      const { oid, role } = signinData;
      const payload = { oid, role, adminId };
      // 유저 토큰 생성
      const accessToken = await getTokenInfo(payload);
      return accessToken;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(error);
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
        throw new NotAcceptableException();
      }

      createAdmindto.password = crypto
        .createHash("sha512")
        .update(createAdmindto.password)
        .digest("hex");

      // const USER_OID = await this.util.getOid(admin, "admin");
      const USER_OID = uuid();
      createAdmindto.oid = USER_OID;

      // 기본 권한
      createAdmindto.role = "ADMIN";

      await admin.create(createAdmindto);
      await t.commit();
    } catch (error) {
      Logger.error(error);
      await t.rollback();
    }
  }

  async addAds(filesData) {
    const t = await this.seqeulize.transaction();
    try {
      const filesResult = [];

      if (filesData) {
        filesData.forEach((file) => {
          const oid = uuid();
          const res = {
            oid: oid,
            postOid: "ads",
            ...file,
          };

          filesResult.push(res);
        });

        await Promise.all(
          filesResult.map((file) => files.create(file, { transaction: t }))
        );
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.log(error);
      throw new UnauthorizedException();
    }
  }

  async getAds() {
    const t = await this.seqeulize.transaction();
    try {
      const ads = await files.findAll({
        attributes: ["label", "filename", "oid"],
        where: {
          postOid: "ads",
        },
      });
      await t.commit();
      return ads;
    } catch (error) {
      Logger.log(error);
      await t.rollback();
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAllAds() {
    const t = await this.seqeulize.transaction();
    try {
      /** data */
      await files.destroy({ where: { postOid: "ads" } });
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  async deleteOneAds(id: string) {
    const t = await this.seqeulize.transaction();
    try {
      /** data */
      await files.destroy({ where: { oid: id } });
      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async changeAdminRole(data) {
    const t = await this.seqeulize.transaction();
    try {
      await admin.update(
        {
          role: data.role,
        },
        {
          where: { oid: data.oid },
          transaction: t,
        }
      );
      await t.commit();
      return;
    } catch (error) {
      await t.rollback();
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
