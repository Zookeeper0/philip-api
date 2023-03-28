import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtUserAuthGuard } from "./guard/admin.auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/authenticate")
  @UseGuards(JwtUserAuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user = req.user;
    return user;
  }
}
