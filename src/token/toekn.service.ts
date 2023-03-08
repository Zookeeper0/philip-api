import { accessJwtOptions, refreshJwtOptions } from "@constants";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { admin } from "src/models";

@Injectable()
export class TokenService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  generateAccessToken(admin: admin) {
    const payload = { name: admin.name, sub: admin.adminId };
    return this.jwtService.sign(payload, accessJwtOptions);
  }

  async generateRefreshToken(admin: admin) {
    try {
      const payload = { name: admin.name, sub: admin.adminId };
      const token = this.jwtService.sign(payload, refreshJwtOptions);
      await this.adminService.updateRefreshToken(admin.adminId, token);

      return token;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
