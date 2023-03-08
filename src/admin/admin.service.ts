import { Injectable } from "@nestjs/common";
import { admin } from "src/models";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  create(createAdminDto: CreateAdminDto) {
    return "This action adds a new admin";
  }

  /** refershToekn update */
  async updateRefreshToken(adminId: string, token: string) {
    return admin.update(
      {
        token: token,
      },
      { where: { adminId: adminId } }
    );
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
