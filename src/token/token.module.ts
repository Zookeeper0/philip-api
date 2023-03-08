import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { TokenService } from "./toekn.service";

@Module({
  providers: [TokenService, AdminService, JwtService],
})
export class TokenModule {}
