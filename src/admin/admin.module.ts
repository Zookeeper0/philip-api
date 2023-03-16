import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { admin } from "src/models";
import { AdminRepository } from "./admin.repository";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { TokenService } from "src/token/token.service";

@Module({
  imports: [SequelizeModule.forFeature([admin]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AuthService, JwtService],
})
export class AdminModule {}
