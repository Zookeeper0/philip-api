import { Injectable } from "@nestjs/common";
import { pbkdf2Sync } from "crypto";
import { admin } from "src/models";

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(userId: string, password: string): Promise<any> {
    // const user = await this.userService.findUser(userId);
    // const inputHash = pbkdf2Sync(
    //   password,
    //   user?.salt || "",
    //   1000,
    //   64,
    //   "sha512"
    // ).toString("hex");
    // if (user && user.password === inputHash) {
    //   return user;
    // }
    // return null;
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
