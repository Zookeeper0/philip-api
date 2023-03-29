import { Controller, Post, Body, Get, Query, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { Response, Request } from "express";

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

  @Get("/kakao")
  getKakaoUsers() {
    return this.userRepository.getKakaoUsers();
  }
}
