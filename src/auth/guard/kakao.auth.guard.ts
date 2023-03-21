import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtKakaoAuthGuard extends NestAuthGuard("jwt-kakao") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
