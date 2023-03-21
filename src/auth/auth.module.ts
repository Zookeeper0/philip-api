import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminRepository } from "src/admin/admin.repository";
import { AdminService } from "src/admin/admin.service";
import { admin } from "src/models";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/passport.jwt.strategy";

@Module({
  imports: [
    PassportModule,
    SequelizeModule.forFeature([admin]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "300s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AdminService, AdminRepository],
})
export class AuthModule {}
