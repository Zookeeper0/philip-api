import { ACCESS_TOKEN_SECRET } from "@environments";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { parse } from "cookie";

type JwtPayload = {
  sub: string;
  name: string;
};

const fromAuthHeaderAsCookie = function () {
  return function (request: any) {
    const cookie = request.cookies ? request.cookies : request.headers?.cookie;
    const token = parse(cookie || "");

    return token["access-token"];
  };
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: fromAuthHeaderAsCookie(),
      // passReqtoCallback: true,
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  validate(payload: JwtPayload, request: any) {
    return { id: payload.sub, name: payload.name };
  }
}
