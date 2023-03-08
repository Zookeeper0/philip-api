import { Injectable } from "@nestjs/common";
import { pbkdf2Sync } from "crypto";
import { AdminRepository } from "src/admin/admin.repository";
import { admin } from "src/models";
import { TokenService } from "src/token/toekn.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly tokenService: TokenService
  ) {}

  async validateUser(adminId: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOneAdmin(adminId);

    const inputHash = pbkdf2Sync(
      password,
      adminId || "",
      1000,
      64,
      "sha512"
    ).toString("hex");

    if (admin && password === inputHash) {
      return admin;
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
