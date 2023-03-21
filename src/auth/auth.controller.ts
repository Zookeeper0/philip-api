import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/authenticate")
  @UseGuards(JwtAuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user = req.user;
    return user;
  }
}
