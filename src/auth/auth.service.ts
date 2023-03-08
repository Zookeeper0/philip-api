import { Injectable } from "@nestjs/common";
import { pbkdf2Sync } from "crypto";
import { AdminRepository } from "src/admin/admin.repository";
import { admin } from "src/models";

@Injectable()
export class AuthService {
  constructor(private readonly adminRepository: AdminRepository) {}

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

  async validRefreshToken(userId: string, token: string): Promise<any> {
    // return this.prisma.refreshToken.findFirst({
    //   where: { userId: userId, token: token },
    // });
  }

  async generateUserToken(admin: admin) {
    // const accessToken = this.tokenService.generateAccessToken(user);
    // const refreshToken = await this.tokenService.generateRefreshToken(user);
    // return { accessToken, refreshToken };
  }
}
