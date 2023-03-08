import { REFRESH_TOKEN_SECRET } from "@environments";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { parse } from "cookie";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

type JwtPayload = {
  sub: string;
  name: string;
};

const fromAuthHeaderAsCookie = function () {
  return function (request: any) {
    const cookie = request.cookies ? request.cookies : request.headers?.cookie;
    const token = parse(cookie || "");

    return token["refresh-token"];
  };
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: fromAuthHeaderAsCookie(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: REFRESH_TOKEN_SECRET,
    });
  }

  async validate(request: any, payload: JwtPayload) {
    if (!payload) {
      throw new BadRequestException("invalid jwt token");
    }

    const cookie = request.cookies ? request.cookies : request.headers?.cookie;
    const token = parse(cookie || "");
    const refreshToken = token["refresh-token"];

    if (!refreshToken) {
      throw new BadRequestException("invalid refresh token");
    }

    const result = await this.authService.validRefreshToken(
      payload.sub,
      refreshToken
    );

    if (!result) {
      throw new BadRequestException("token expired");
    }

    return { id: payload.sub, name: payload.name };
  }
}
