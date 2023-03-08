import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminRepository } from "src/admin/admin.repository";
import { TokenService } from "src/token/toekn.service";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
  imports: [PassportModule],
  providers: [
    TokenService,
    AdminRepository,
    LocalStrategy,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
