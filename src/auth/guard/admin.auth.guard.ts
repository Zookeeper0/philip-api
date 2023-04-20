import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";

/** 어드민 유효성 검증 */
@Injectable()
export class JwtUserAuthGuard extends NestAuthGuard("jwt-admin") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
