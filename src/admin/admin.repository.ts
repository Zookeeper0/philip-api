import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { admin } from "src/models";

@Injectable()
export class AdminRepository {
  constructor(private readonly seqeulize: Sequelize) {}

  /** SELECT ALL */
  async findAllAdmin() {
    try {
      const adminList = await admin.findAll();
      return adminList;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /** SELECT ONE */
  async findOneAdmin(adminId: string) {
    try {
      const adminOneUser = await admin.findOne({ where: { adminId: adminId } });
      return adminOneUser;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
