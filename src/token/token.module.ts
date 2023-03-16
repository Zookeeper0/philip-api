import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./token.service";

@Module({
  imports: [],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
