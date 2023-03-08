import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "adminId" });
  }

  async validate(adminId: string, password: string): Promise<any> {
    const admin = await this.authService.validateUser(adminId, password);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
