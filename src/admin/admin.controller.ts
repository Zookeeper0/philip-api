import { Controller, Post, Body, Res, Get, Req, Delete } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { Request, Response } from "express";

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
    return res.send(accessToken);
  }

  /** 관리자 페이지 관리자 설정, 관리자 리스트 */
  @Get("/list")
  getAdminList(@Req() req: Request) {
    return this.adminRepository.getAdminList(req);
  }

  /** 광고 추가 */
  @Post("/ads")
  addAds(@Body() body, @Req() req: Request) {
    return this.adminService.addAds(body);
  }
  /** 광고 리스트 */
  @Get("/ads")
  getAds() {
    return this.adminService.getAds();
  }

  @Delete("/ads")
  deleteAllAds() {
    return this.adminService.deleteAllAds();
  }
}
