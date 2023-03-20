import { Controller, Post, Logger, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

@Controller("user")
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  // 카카오 로그인
  @Post("/kakao/callback")
  signIn(@Query("code") code: string) {
    return this.userService.kakaoLogin(code);
  }
}
