import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  UseGuards,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { Response, Request } from "express";
import { JwtUserAuthGuard } from "src/auth/guard/admin.auth.guard";

@Controller("user")
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  /** 카카오 로그인 */
  @Post("/kakao")
  async login(@Body() code: string, @Res() res: Response) {
    const accessToken = await this.userService.kakaoLogin(code);
    return res.send(accessToken);
  }

  /** GET admin 페이지 회원관리 */
  // @UseGuards(JwtUserAuthGuard)
  @Get("/kakao")
  getKakaoUsers() {
    return this.userRepository.getKakaoUsers();
  }

  @Put("/role")
  changeUserRole(@Body() body) {
    return this.userService.changeUserRole(body);
  }
}
