import { Injectable } from "@nestjs/common";
import { pbkdf2Sync } from "crypto";
import { AdminService } from "src/admin/admin.service";
import { admin } from "src/models";
import { TokenService } from "src/token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly adminService: AdminService
  ) {}

  async validateUser(adminId: string, password: string): Promise<any> {
    const adminModel = await this.adminService.findOneAdmin(adminId);

    const inputHash = pbkdf2Sync(
      password,
      adminId || "",
      1000,
      64,
      "sha512"
    ).toString("hex");

    if (adminModel && password === inputHash) {
      return adminModel;
    }

    return null;
  }

  async validRefreshToken(adminId: string, token: string): Promise<any> {
    return admin.findOne({ where: { adminId: adminId, token: token } });
  }

  async generateUserToken(admin: admin) {
    const accessToken = this.tokenService.generateAccessToken(admin);
    const refreshToken = await this.tokenService.generateRefreshToken(admin);

    return { accessToken, refreshToken };
  }
}
