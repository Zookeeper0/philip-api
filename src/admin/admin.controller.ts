import { Controller, Post, Logger, Body, Get } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminService: AdminService
  ) {}
  private logger = new Logger("AdminController");

  // 회원가입
  @Post("/signup")
  signUp(@Body() createAdmindto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdmindto);
  }

  // 로그인
  @Post("/signin")
  signIn(@Body() signInAdminDto: SignInAdminDto) {
    return this.adminService.signInAdmin(signInAdminDto);
  }
}
