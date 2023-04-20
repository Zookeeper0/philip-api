import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminRepository } from "src/admin/admin.repository";
import { AdminService } from "src/admin/admin.service";
import { admin, kakaoUser } from "src/models";
import { Utils } from "src/util/common.utils";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/admin.jwt.strategy";
import { KakaoJwtStrategy } from "./strategies/kakao.jwt.strategy";

@Module({
  imports: [PassportModule, SequelizeModule.forFeature([admin, kakaoUser])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    KakaoJwtStrategy,
    AdminService,
    AdminRepository,
    Utils,
  ],
})
export class AuthModule {}
