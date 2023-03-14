import { Controller, Post, Logger, Body, Get } from "@nestjs/common";
import { category } from "src/models";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";
import { CategoryDto } from "./dto/category/category.dto";
import { CityDto } from "./dto/city/city.dto";
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

  // 카테고리에 선택에 따른 메뉴
  @Get("/category")
  getAllCategory() {
    return this.adminService.getAllCategory();
  }

  // 카테고리 생성
  @Post("/category")
  addCategory(@Body() categoryDto: CategoryDto) {
    return this.adminService.createCategory(categoryDto);
  }

  @Post("/city")
  addCity(@Body() cityDto: CityDto) {
    return this.adminService.createCity(cityDto);
  }
}
