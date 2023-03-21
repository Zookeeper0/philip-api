import {
  Controller,
  Post,
  Logger,
  Body,
  Get,
  Res,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CityDto } from "../category/dto/city.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { Response, Request } from "express";
import { JwtAuthGuard } from "src/auth/guard/auth.guard";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminService: AdminService
  ) {}

  /** 회원가입 */
  @Post("/signup")
  signUp(@Body() createAdmindto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdmindto);
  }

  /** 로그인 */
  @Post("/signin")
  async signIn(@Body() signInAdminDto: SignInAdminDto, @Res() res: Response) {
    const accessToken = await this.adminService.signInAdmin(signInAdminDto);
    console.log("acc", accessToken);
    res.setHeader("Authorization", "Bearer " + accessToken.accessToken);
    res.cookie("jwt", accessToken.accessToken, {
      httpOnly: true,
      //하루
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send({
      message: "success",
    });
  }
}
