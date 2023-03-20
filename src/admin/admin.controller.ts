import { Controller, Post, Logger, Body, Get, Session } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CityDto } from "../category/dto/city.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";

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
  signIn(@Body() signInAdminDto: SignInAdminDto) {
    return this.adminService.signInAdmin(signInAdminDto);
  }

  @Get("/visit")
  checkTodayVisit(@Session() session: Record<string, any>) {
    Logger.log("hi visitor");
    console.log("session", session);
    session.visits = session.visits ? session.visits + 1 : 1;
    return { count: "Hello" };
  }
}
