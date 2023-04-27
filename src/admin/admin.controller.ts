import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  Delete,
  Param,
  UseGuards,
  Put,
} from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInAdminDto } from "./dto/sigIn-admin.dto";
import { Request, Response } from "express";
import { JwtUserAuthGuard } from "src/auth/guard/admin.auth.guard";

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

  /** admin 페이지 관리자 설정, 관리자 리스트 */
  @UseGuards(JwtUserAuthGuard)
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

  @Delete("/ads/:id")
  deleteOneAds(@Param("id") id: string) {
    return this.adminService.deleteOneAds(id);
  }

  @Delete("/ads")
  deleteAllAds() {
    return this.adminService.deleteAllAds();
  }

  @Put("/role")
  changeUserRole(@Body() body) {
    return this.adminService.changeAdminRole(body);
  }
}
