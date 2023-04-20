import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class KakaoJwtStrategy extends PassportStrategy(Strategy, "jwt-kakao") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload, done): Promise<any> {
    console.log("payload!!", payload);

    let admin = null;
    let user = null;
    if (payload.adminId) {
      admin = await this.authService.tokenValidate(payload);
    } else {
      user = await this.authService.kakaoValidate(payload);
    }

    if (!user && !admin) {
      return done(
        new UnauthorizedException({ message: "user does not exist" }),
        false
      );
    }

    return done(null, user || admin);
  }
}
