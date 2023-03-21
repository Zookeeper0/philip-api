import { Controller, Post, Body, Logger, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

@Controller("user")
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  // 카카오 로그인
  @Post("/kakao")
  login(@Body() code: string) {
    console.log(code);
    return this.userService.kakaoLogin(code);
  }
}
