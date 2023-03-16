import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginInterface } from "./interface/login.interface";
import * as crypto from "crypto";
import { AuthService } from "src/auth/auth.service";
import { admin } from "src/models";

@Injectable()
export class AdminService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly authService: AuthService
  ) {}

  /** 관리자 로그인 */
  async login(loginInterface: LoginInterface) {
    const adminModel = new admin();
    try {
      // duple check
      const userData = await admin.findOne({
        where: {
          adminId: loginInterface.adminId,
          password: crypto
            .createHash("sha512")
            .update(loginInterface.password)
            .digest("hex"),
        },
      });

      if (!userData) {
        throw new UnauthorizedException("로그인 정보를 찾을 수 없습니다.");
      }

      const toekn = await this.authService.generateUserToken(adminModel);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOneAdmin(adminId: string) {
    return await admin.findOne({ where: { adminId: adminId } });
  }

  create(createAdminDto: CreateAdminDto) {
    return "This action adds a new admin";
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
